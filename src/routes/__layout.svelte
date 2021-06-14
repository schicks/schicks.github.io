
<style>
  header {
    border-bottom: 8px solid black;
    display: flex;
    align-items: center;
    padding-left: 1.45rem;
    min-height: 90px;
    margin-bottom: 1.45rem;
  }
  .body {
    padding: 0 20px;
    max-width: 800px;
    margin: 0 auto;
  }
</style>

<header>
  <a href="/"><h1>Simon would have said</h1></a>
</header>
<div class="body">
  <slot></slot>
</div>