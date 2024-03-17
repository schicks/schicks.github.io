<script lang="ts">
  import { onMount } from 'svelte'
  import Pegboard from './Pegboard.svelte'

  export let axisLength: number
  $: circleEdge = axisLength ** 2

  let data: { x: number; y: number; in?: boolean }[] = new Array(axisLength ** 2)
    .fill(0)
    .map((_, i) => ({
      y: i % axisLength,
      x: Math.floor(i / axisLength)
    }))
  $: pi = (4 * data.filter((el) => el.in).length) / data.filter((el) => el.in !== undefined).length

  let currentColumn = 0
  let currentRange = [0, axisLength]
  onMount(() => {
    setInterval(() => {
      const [min, max] = currentRange
      const offset = currentColumn * axisLength
      console.log(min, max, offset)
      if (min >= max) return
      const index = offset + Math.floor((min + max) / 2)
      const topOfColumn = index - offset === axisLength - 1
      const el = data[index]
      if (el === undefined) return
      el.in = el.x ** 2 + el.y ** 2 < circleEdge
      console.log(el, index)
      if (el.in) {
        new Array(index - min).fill(null).forEach((_, j) => {
          data[currentColumn + min + j].in = true
        }) // set all lower in a column true
        currentRange = [index - offset, max]
        if (topOfColumn || data[index + 1].in === false) {
          currentColumn++
          currentRange = [0, axisLength]
        }
      } else {
        new Array(max - index).fill(null).forEach((_, j) => {
          data[currentColumn + index + j].in = false
        }) // set all upper in a column false
        currentRange = [min, index]
      }
      data = data
    })
  })
</script>

<Pegboard {data} />
<p>Approximate value of pi: {pi}</p>
