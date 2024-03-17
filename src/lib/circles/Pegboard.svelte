<script lang="ts">
  import type { ScaleOrdinal } from 'd3'
  import { scaleLinear, scaleOrdinal, select } from 'd3'

  export let data: { x: number; y: number; in?: boolean }[]
  let group: SVGGElement

  const marginTop = 5
  const marginRight = 5
  const marginBottom = 5
  const marginLeft = 5

  $: axisLength = Math.sqrt(data.length)
  $: viewboxWidth = axisLength * 5 + marginLeft + marginRight
  $: viewboxHeight = axisLength * 5 + marginTop + marginBottom

  // Define the horizontal scale.
  $: x = scaleLinear()
    .domain([0, axisLength])
    .nice()
    .range([marginRight, viewboxWidth - marginLeft])

  // Define the vertical scale.
  $: y = scaleLinear()
    .domain([0, axisLength])
    .nice()
    .range([viewboxHeight - marginBottom, marginTop])

  // Define the color scale.
  $: c = scaleOrdinal()
    .domain([undefined, true, false] as any)
    .range(['white', 'red', 'blue']) as ScaleOrdinal<any, string, any>

  $: {
    select(group)
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => x(d.x))
      .attr('cy', (d) => y(d.y))
      .attr('r', 2)
      .attr('fill', (d) => c(d.in))
  }
</script>

<svg viewBox="0 0 {viewboxWidth} {viewboxHeight}">
  <g bind:this={group} />
</svg>

<style>
  svg {
    width: 80%;
    height: auto;
    margin: 0 auto;
    display: block;
    border: 1px solid black;
  }
</style>
