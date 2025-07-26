<script>
  import { page } from '$app/stores'
</script>

<svelte:head>
  <title>Demos - Simon's Projects</title>
  <meta name="description" content="Interactive demos of various projects and experiments" />
</svelte:head>

<main>
  <h1>Interactive Demos</h1>

  <p>A collection of interactive demonstrations showcasing various projects and experiments.</p>

  <div class="demos-grid">
    <div class="demo-card">
      <h2><a href="/demos/lazymesh">LazyMesh P2P Network</a></h2>
      <p>
        Experience peer-to-peer mesh networking in action. Connect with other browsers directly
        using WebRTC and visualize the network topology with D3.
      </p>
      <ul>
        <li>🔗 Direct P2P connections via WebRTC</li>
        <li>Interactive network visualization</li>
      </ul>
    </div>
  </div>
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .demos-grid {
    display: grid;
    gap: 2rem;
    margin-top: 2rem;
  }

  .demo-card {
    border: 2px solid #333;
    border-radius: 8px;
    padding: 1.5rem;
    background: #f9f9f9;
  }

  .demo-card h2 {
    margin-top: 0;
  }

  .demo-card h2 a {
    color: #333;
    text-decoration: none;
  }

  .demo-card h2 a:hover {
    text-decoration: underline;
  }

  .demo-card ul {
    margin: 1rem 0;
  }

  .demo-card li {
    margin: 0.5rem 0;
  }
</style>
