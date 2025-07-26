<script lang="ts">
  import { onMount } from 'svelte'
  import * as d3 from 'd3'
  import type { Simulation } from 'd3'
  import type { Node, Link, VisualizationConfig } from './types'
  import type { PeerInfo as LazyMeshPeerInfo } from 'lazymesh'
  import { constrain } from './mesh-utils'

  export let knownPeers: Map<string, LazyMeshPeerInfo>
  export let connectedPeers: string[]
  export let myPeerId: string
  export let config: VisualizationConfig

  let svg: SVGSVGElement
  let simulation: Simulation<Node, Link>
  let nodes: Node[] = []
  let links: Link[] = []

  onMount(() => {
    initializeVisualization()
  })

  $: if (svg && simulation && myPeerId) {
    updateVisualization()
  }

  // React to changes in peer data
  $: if (svg && simulation && myPeerId && (knownPeers || connectedPeers)) {
    updateVisualization()
  }

  function initializeVisualization() {
    if (!svg) return

    // Clear any existing content
    d3.select(svg).selectAll('*').remove()

    // Set up SVG
    const svgElement = d3.select(svg).attr('width', config.width).attr('height', config.height)

    // Create simulation with stronger centering forces
    simulation = d3
      .forceSimulation<Node>()
      .force(
        'link',
        d3
          .forceLink<Node, Link>()
          .id((d: Node) => d.id)
          .distance(150)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('collision', d3.forceCollide<Node>().radius(30))
      // Add boundary forces to keep nodes within the SVG viewport
      .force('x', d3.forceX<Node>(config.width / 2).strength(0.1))
      .force('y', d3.forceY<Node>(config.height / 2).strength(0.1))

    // Create groups for links and nodes
    svgElement.append('g').attr('class', 'links')
    svgElement.append('g').attr('class', 'nodes')

    updateVisualization()
  }

  function updateVisualization() {
    if (!myPeerId || !svg || !simulation) return

    // Build nodes array
    nodes = []
    const nodeMap = new Map<string, Node>()

    // Add my node
    const myNode: Node = {
      id: myPeerId,
      isMe: true,
      isConnected: true,
      x: config.width / 2,
      y: config.height / 2
    }
    nodes.push(myNode)
    nodeMap.set(myPeerId, myNode)

    // Add known peer nodes
    for (const [peerId, peerInfo] of knownPeers) {
      if (peerId !== myPeerId) {
        const node: Node = {
          id: peerId,
          isMe: false,
          isConnected: connectedPeers.includes(peerId),
          peerInfo,
          // Initialize nodes near the center with some random offset
          x: config.width / 2 + (Math.random() - 0.5) * 100,
          y: config.height / 2 + (Math.random() - 0.5) * 100
        }
        nodes.push(node)
        nodeMap.set(peerId, node)
      }
    }

    // Build links array
    links = []

    // Add my direct connections
    for (const peerId of connectedPeers) {
      links.push({
        source: myPeerId,
        target: peerId,
        isDirect: true
      })
    }

    // Add connections between other peers (from topology info)
    for (const [peerId, peerInfo] of knownPeers) {
      if (peerId !== myPeerId && peerInfo.connections) {
        for (const connectedPeer of peerInfo.connections) {
          if (nodeMap.has(connectedPeer) && connectedPeer !== myPeerId) {
            // Avoid duplicate links
            const linkExists = links.some(
              (link) =>
                (link.source === peerId && link.target === connectedPeer) ||
                (link.source === connectedPeer && link.target === peerId)
            )

            if (!linkExists) {
              links.push({
                source: peerId,
                target: connectedPeer,
                isDirect: false
              })
            }
          }
        }
      }
    }

    // Update D3 visualization
    const svgElement = d3.select(svg)

    // Update links
    const link = svgElement.select('.links').selectAll<SVGLineElement, Link>('line').data(links)

    link.exit().remove()

    const linkEnter = link
      .enter()
      .append('line')
      .attr('stroke', (d) => (d.isDirect ? '#333' : '#999'))
      .attr('stroke-width', (d) => (d.isDirect ? 3 : 1))
      .attr('stroke-opacity', (d) => (d.isDirect ? 0.8 : 0.4))

    linkEnter.merge(link)

    // Update nodes
    const node = svgElement.select('.nodes').selectAll<SVGGElement, Node>('g').data(nodes)

    node.exit().remove()

    const nodeEnter = node
      .enter()
      .append('g')
      .call(
        d3
          .drag<SVGGElement, Node>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      )

    // Add circles
    nodeEnter
      .append('circle')
      .attr('r', 20)
      .attr('fill', (d) => (d.isMe ? '#ff6b6b' : d.isConnected ? '#4ecdc4' : '#95a5a6'))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)

    // Add labels
    nodeEnter
      .append('text')
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#333')
      .text((d) => d.id.substring(0, 8))

    // Merge with existing nodes
    const nodeUpdate = nodeEnter.merge(node)

    nodeUpdate
      .select('circle')
      .attr('fill', (d) => (d.isMe ? '#ff6b6b' : d.isConnected ? '#4ecdc4' : '#95a5a6'))

    nodeUpdate.select('text').text((d) => d.id.substring(0, 8))

    // Update simulation
    const previousNodeCount = simulation.nodes().length
    const previousLinkCount =
      simulation.force<d3.ForceLink<Node, Link>>('link')?.links()?.length ?? 0

    simulation.nodes(nodes)
    const linkForce = simulation.force<d3.ForceLink<Node, Link>>('link')
    if (linkForce) {
      linkForce.links(links)
    }

    // Ensure all nodes have proper initial positions
    nodes.forEach((d) => {
      if (d.x === undefined) d.x = config.width / 2 + (Math.random() - 0.5) * 100
      if (d.y === undefined) d.y = config.height / 2 + (Math.random() - 0.5) * 100
    })

    // Only restart simulation if there are actual structural changes (new/removed nodes/links)
    const hasStructuralChanges =
      nodes.length !== previousNodeCount || links.length !== previousLinkCount

    if (hasStructuralChanges) {
      simulation.alpha(0.3).restart() // Use lower alpha for gentler restart
    }

    // Update positions on tick
    simulation.on('tick', () => {
      // Update link positions
      svgElement
        .select('.links')
        .selectAll('line')
        .attr('x1', (d: any) => {
          const source =
            typeof d.source === 'object' ? d.source : nodes.find((n) => n.id === d.source)
          return source
            ? constrain(source.x || config.width / 2, 30, config.width - 30)
            : config.width / 2
        })
        .attr('y1', (d: any) => {
          const source =
            typeof d.source === 'object' ? d.source : nodes.find((n) => n.id === d.source)
          return source
            ? constrain(source.y || config.height / 2, 30, config.height - 30)
            : config.height / 2
        })
        .attr('x2', (d: any) => {
          const target =
            typeof d.target === 'object' ? d.target : nodes.find((n) => n.id === d.target)
          return target
            ? constrain(target.x || config.width / 2, 30, config.width - 30)
            : config.width / 2
        })
        .attr('y2', (d: any) => {
          const target =
            typeof d.target === 'object' ? d.target : nodes.find((n) => n.id === d.target)
          return target
            ? constrain(target.y || config.height / 2, 30, config.height - 30)
            : config.height / 2
        })

      // Update node positions
      svgElement
        .select('.nodes')
        .selectAll('g')
        .attr('transform', (d: any) => {
          // Constrain positions within boundaries and update the node object
          const x = constrain(d.x || config.width / 2, 30, config.width - 30)
          const y = constrain(d.y || config.height / 2, 30, config.height - 30)
          d.x = x
          d.y = y
          return `translate(${x},${y})`
        })
    })
  }

  function dragstarted(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
    // Constrain dragged position within boundaries
    d.fx = constrain(event.x || config.width / 2, 30, config.width - 30)
    d.fy = constrain(event.y || config.height / 2, 30, config.height - 30)
  }

  function dragended(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
    if (!event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }
</script>

<div class="visualization">
  <h2>Network Topology</h2>
  <div class="legend">
    <div class="legend-item">
      <div class="legend-color me"></div>
      <span>You</span>
    </div>
    <div class="legend-item">
      <div class="legend-color connected"></div>
      <span>Direct Connections</span>
    </div>
    <div class="legend-item">
      <div class="legend-color known"></div>
      <span>Known Peers</span>
    </div>
  </div>
  <svg bind:this={svg}></svg>
</div>

<style>
  .visualization {
    margin-bottom: 2rem;
  }

  .legend {
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 4px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .legend-color {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #fff;
  }

  .legend-color.me {
    background: #ff6b6b;
  }

  .legend-color.connected {
    background: #4ecdc4;
  }

  .legend-color.known {
    background: #95a5a6;
  }

  svg {
    border: 2px solid #333;
    border-radius: 8px;
    background: #fff;
  }
</style>
