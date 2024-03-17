<script lang="ts">
  import { onMount } from 'svelte'
  import Pegboard from './Pegboard.svelte'

  export let axisLength: number
  $: circleEdge = axisLength ** 2
  let activeIndex = 0

  let data: { x: number; y: number; in?: boolean }[] = new Array(axisLength ** 2)
    .fill(0)
    .map((_, i) => ({
      x: i % axisLength,
      y: Math.floor(i / axisLength)
    }))
  $: pi = (4 * data.filter((el) => el.in).length) / data.filter((el) => el.in !== undefined).length

  onMount(() => {
    setInterval(() => {
      const el = data[activeIndex]
      if (el === undefined) return
      el.in = el.x ** 2 + el.y ** 2 < circleEdge
      activeIndex++
      data = data
    })
  })
</script>

<Pegboard {data} />
<p>Approximate value of pi: {pi}</p>
