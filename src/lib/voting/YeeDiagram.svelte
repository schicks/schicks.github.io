<!--
  @component
  Draws a Yee diagram given a set of candidate positions.
  Takes as a parameter the name of one of the voting metods from "./elections".
-->
<script context="module" lang="ts">
  import { Voronoi, randomLcg } from 'd3'
  import type { Selection } from 'd3'
  import type { Point, NamedPoint } from './types'
  import { methods } from './elections'
  let created = 0
</script>

<script lang="ts">
  import { scaleOrdinal, randomNormal, Delaunay, drag, select } from 'd3'
  import { onMount } from 'svelte'
  import bush from './assets/bush.png'
  import gore from './assets/gore.png'
  import nader from './assets/nader.png'

  export let label: string | undefined
  export let candidates: Point[]
  export let nVoters = 100
  export let r = 20
  export let fidelity = 30
  export let seed = 1158
  export let method: keyof typeof methods = 'plurality'

  let namedCandidates = candidates.map(([x, y], i) => ({ x, y, i }))
  let colors = scaleOrdinal(
    namedCandidates.map(({ i }) => i),
    ['#0C7BDC', '#DC3220', '#FFC034']
  ).unknown('#000000')
  let pictures = scaleOrdinal(
    namedCandidates.map(({ i }) => i),
    [gore, bush, nader]
  )

  const voterDistribution = randomNormal.source(randomLcg(seed))(0, 20)
  const voters: Point[] = new Array(nVoters)
    .fill(null)
    .map(() => [voterDistribution(), voterDistribution()])
  const elect = methods[method](namedCandidates, voters)
  const winners: [Point, NamedPoint][] = new Array(fidelity ** 2)
  const imgSize = 10

  let regionSelection:
    | Selection<SVGPathElement, [Point, NamedPoint], SVGGElement, unknown>
    | undefined = undefined
  let voronoi: Voronoi<Delaunay.Point> | undefined = undefined

  $: updateWinners = () => {
    if (!regionSelection) return

    const cellSize = 100 / fidelity
    for (let x = 0; x < fidelity; x++) {
      const offset = fidelity * x
      const jitter = x % 2 ? 0 : 0.5
      for (let y = 0; y < fidelity; y++) {
        let point: Point = [x * cellSize, (y + jitter) * cellSize]
        winners[offset + y] = [point, elect(point, r)]
      }
    }

    if (!voronoi) {
      const localVoronoi = Delaunay.from(
        winners,
        ([[x]]) => x,
        ([[_, y]]) => y
      ).voronoi([0, 0, 100, 100])
      voronoi = localVoronoi
      regionSelection.data(winners).attr('d', (_, i) => localVoronoi.renderCell(i))
    }
    regionSelection.data(winners).attr('fill', (d) => colors(d[1].i))
  }
  $: updateWinners()

  created += 1
  const id = `yee-diagram-${created}`

  const dragBehavior = drag<SVGGElement, NamedPoint>()
    .on('drag', function (event, d: NamedPoint) {
      d.x = event.x
      d.y = event.y
      select(this).attr('transform', `translate(${d.x} ${d.y})`)
    })
    .on('end.update', () => updateWinners())

  onMount(() => {
    const parent = select<SVGSVGElement, unknown>('#' + id)
    regionSelection = parent
      .append('g')
      .attr('stroke', 'none')
      .selectAll<SVGPathElement, unknown>('path')
      .data(winners)
      .join('path')
      .attr('opacity', 0.3)
      .attr('stroke-width', 0)

    updateWinners()

    const candidateSelection = parent
      .selectAll<SVGGElement, unknown>('g.candidate')
      .data(namedCandidates)
      .join('g')
      .attr('class', 'candidate')
      .attr('transform', (d) => `translate(${d.x} ${d.y})`)
      .call(dragBehavior)

    candidateSelection
      .append('circle')
      .attr('r', 6)
      .attr('fill', ({ i }) => colors(i))

    candidateSelection
      .append('image')
      .attr('width', imgSize)
      .attr('height', imgSize)
      .attr('x', -imgSize / 2)
      .attr('y', -imgSize / 2)
      .attr('clip-path', 'url(#imgClip)')
      .attr('href', ({ i }) => pictures(i))
  })
</script>

<figure>
  <svg {id} viewBox="0 0 100 100">
    <line x1="0" y1="50" x2="100" y2="50" />
    <defs>
      <clipPath id="imgClip">
        <circle r="5" />
      </clipPath>
    </defs>
  </svg>
  {#if label}
    <figcaption>{label}</figcaption>
  {/if}
</figure>

<style>
  figure {
    aspect-ratio: 1/1;
    max-width: 600px;
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
  line {
    stroke-width: 0.2;
    stroke: black;
  }
</style>
