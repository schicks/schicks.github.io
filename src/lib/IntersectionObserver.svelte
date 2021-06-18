<script lang="ts">
  import { onMount } from "svelte";
  let el: HTMLDivElement
  export let initialHeight = 0
  let observed = false
  let initial = false

  onMount(() => {
    const observer = new IntersectionObserver(() => {
      if (initial) {
        observed = true
      } else {
        initial = true
      }
    }, {threshold: 0.2})
    observer.observe(el)
  })
</script>

<div bind:this={el} style="min-height: {initialHeight}px;">
  {#if observed}
    <slot/>
  {/if}
</div>