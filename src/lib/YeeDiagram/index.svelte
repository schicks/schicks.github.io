<script context="module" lang="ts">
  import type {Delaunay, Voronoi, Selection} from 'd3'
  import type {Point, NamedPoint} from './types'
  import {plurality, approval} from './elections'
  const methods = {
    plurality,
    approval
  }
  let created = 0;
</script>

<script lang="ts">
  import * as d3 from 'd3'
  import { onMount } from 'svelte'

  export let label: string | undefined
  export let candidates: Point[]
  export let nVoters: number = 100
  export let r: number = 20
  export let method: keyof typeof methods = 'plurality'


  let namedCandidates = candidates.map(([x, y], i) => ({x, y, i}))

  const colors = d3.scaleOrdinal(
    namedCandidates.map(({i}) => i), 
    [
      '#009E73',
      '#0072B2', 
      '#D55E00', 
      '#F0E442',
      '#56B4E9',
      '#E69F00'
    ]
  ).unknown('#000000')
  let voronoi: Voronoi<Delaunay.Point>
  
  let height: number
  let width: number
  let regionSelection: Selection<SVGPathElement, [Point, NamedPoint], SVGGElement, unknown> | undefined = undefined
  const voterDistribution = d3.randomNormal(0, 20)
  const voters: Point[] = new Array(nVoters)
    .fill(null)
    .map(() => [voterDistribution(), voterDistribution()])
  const elect = methods[method]
  const fidelity = 50
  const winners: [Point, NamedPoint][] = new Array(fidelity ** 2)
  $: updateWinners = () => {
    if (!regionSelection) return

    for (let x=0; x < fidelity; x++) {
      let offset = fidelity * x
      for (let y=0; y < fidelity; y++) {
        let point: Point = [x * 100 / fidelity, y * 100 / fidelity]
        winners[offset + y] = [
          point, 
          elect(namedCandidates, voters, point, r)
        ]
      }
    }

    voronoi = d3.Delaunay
      .from(winners, ([[x]]) => x, ([[_, y]]) => y)
      .voronoi([0, 0, width, height])
    regionSelection
      .data(winners)
      .attr('d', (_, i) => voronoi.renderCell(i))
      .attr('fill', d => colors(d[1].i))
  }
  $: updateWinners()
  
  created += 1
  const id = `yee-diagram-${created}`

  const drag = d3.drag<SVGCircleElement, NamedPoint>()
    .on('drag', function(event, d: NamedPoint) {
      d3.select(this)
        .attr('cx', d.x = event.x)
        .attr('cy', d.y = event.y)
    })
    .on('end.update', () => updateWinners())

  onMount(() => {
    const parent = d3.select<SVGSVGElement, unknown>('#'+id)
    regionSelection = parent
      .append('g')
      .attr('stroke', 'none')
      .selectAll<SVGPathElement, unknown>('path')
      .data(winners)
      .join('path')
      .attr('opacity', .3)
      .attr('stroke-width', 0)

    updateWinners()

    parent
      .selectAll<SVGCircleElement, unknown>('circle')
      .data(namedCandidates)
      .join('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 2)
      .attr('fill', ({i}) => colors(i))
      .call(drag)

  })

</script>

<figure bind:clientWidth={width} bind:clientHeight={height}>
  <svg 
    id={id}
    viewBox="0 0 100 100"
  />
  {#if (label)}
  <figcaption>{label}</figcaption>
  {/if}
</figure>

<style>
  figure {
    aspect-ratio: 1/1;
    max-width: 300px;
    margin: 0 auto;
  }
  svg {
    width: 100%;
    height: 100%;
  }
  figcaption {
    text-align: center;
    font-style: italic;
  }
</style>