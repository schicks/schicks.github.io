<!--
  @component
  Presents a simulated plurality election.
  Voter preferences and candidate positions are assumed to exist in the same 2D plane.
  Voters are assumed to prefer candidates closest to them, and are colored as such.
  Labels the candidates as bush, nader and gore.

-->

<script context="module" lang="ts">
  import { pointer } from 'd3'
  import type { Point, NamedPoint } from './types'
  let created = 0
</script>

<script lang="ts">
  import { scaleOrdinal, randomNormal, drag, select } from 'd3'
  import type { Selection } from 'd3'
  import { onMount } from 'svelte'
  import { euclidean } from './elections'
  import bush from './assets/bush.png'
  import gore from './assets/gore.png'
  import nader from './assets/nader.png'

  export let label: string | undefined
  export let candidates: Point[]
  export let nVoters: number = 100

  let namedCandidates = candidates.map(([x, y], i) => ({ x, y, i }))
  let colors = scaleOrdinal(
    namedCandidates.map(({ i }) => i),
    ['#0C7BDC', '#DC3220', '#FFC034']
  ).unknown('#000000')
  let pictures = scaleOrdinal(
    namedCandidates.map(({ i }) => i),
    [gore, bush, nader]
  )

  const voterDistribution = randomNormal(0, 20)
  const imgSize = 10

  let voters: Point[] = []
  let parent: Selection<SVGSVGElement, any, any, any>

  created += 1
  const id = `voting-simulation-${created}`

  const updateVoters = () => {
    parent
      .selectAll('circle.voter')
      .data(voters)
      .join('circle')
      .attr('class', 'voter')
      .attr('cx', ([x]) => x)
      .attr('cy', ([_, y]) => y)
      .attr('r', 1)
      .attr('opacity', 0.5)
      .attr('fill', (voter) => {
        return colors(
          namedCandidates.sort((a, b) => {
            return euclidean(voter, [a.x, a.y]) - euclidean(voter, [b.x, b.y])
          })[0].i
        )
      })
  }

  const dragBehavior = drag<SVGGElement, NamedPoint>()
    .on('drag', function (event, d: NamedPoint) {
      d.x = event.x
      d.y = event.y
      select(this).attr('transform', `translate(${d.x} ${d.y})`)
    })
    .on('end.update', updateVoters)

  onMount(() => {
    parent = select<SVGSVGElement, unknown>('#' + id)

    const simulate = (x: number, y: number) => {
      voters = new Array(nVoters)
        .fill(null)
        .map(() => [voterDistribution() + x, voterDistribution() + y])
      updateVoters()
    }

    parent.on('click', (event) => {
      const [x, y] = pointer(event)
      simulate(x, y)
    })
    simulate(50, 50)

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
