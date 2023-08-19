<script lang="ts">
  export let location: string
</script>

<section>
  <summary>
    <h3><slot name="title" /></h3>
    <aside>{location}</aside>
  </summary>
  <slot />
</section>

<style lang="scss">
  h3 {
    margin: 0;
    font-style: normal;
  }
  summary {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }
  aside {
    font-weight: bold;
  }
</style>
