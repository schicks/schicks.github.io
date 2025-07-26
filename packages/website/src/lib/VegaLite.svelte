<script lang="ts">
  import { onMount } from 'svelte'
  import embed from 'vega-embed'
  import type { VisualizationSpec } from 'vega-embed'

  let element: HTMLElement | undefined = undefined
  export let spec: VisualizationSpec

  onMount(async () => {
    if (element) {
      await embed(element, spec)
    }
  })
</script>

<figure>
  <div bind:this={element} aria-hidden="false">
    <div class="warning">Vega graph failed to render. Do you have javascript disabled?</div>
  </div>
  <figcaption>{spec.description}</figcaption>
</figure>

<style>
  figcaption {
    font-style: italic;
  }
  .warning {
    font-weight: bold;
    margin: 6px;
  }
</style>
