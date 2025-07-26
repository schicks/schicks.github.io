<script lang="ts">
  export let title: string
  export let period: string
</script>

<div class="jobrole">
  <h4>{title}</h4>
  <aside>{period}</aside>
</div>
<ul>
  <slot />
</ul>

<style lang="scss">
  .jobrole {
    margin-left: 8px;
    display: flex;
    justify-content: space-between;
  }
  h4 {
    margin: 0;
    font-style: normal;
  }
  aside {
    font-weight: bold;
  }
  ul {
    margin-top: 4px;
  }
  @media (max-width: 500px) {
    .jobrole {
      flex-direction: column;
    }
  }
</style>
