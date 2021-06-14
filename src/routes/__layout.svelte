<header>
  <a href="/"><h1>Simon would have said</h1></a>
  <div class="links">
    <a href="/whos-simon">Who's Simon?</a>
  </div>
</header>
<div class="body">
  <slot />
</div>

<style lang="scss">
  header {
    border-bottom: 8px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.45rem;
    min-height: 90px;
    margin-bottom: 1.45rem;
    .links {
      font-size: 20px;
      font-weight: 600;
      margin-top: 10px;
    }
  }
  .body {
    padding: 0 20px;
    max-width: 800px;
    margin: 0 auto;
  }
</style>
