<div class="instructions">
  <h3>How to Use:</h3>
  <ol>
    <li>Click "Connect to Mesh" to join the P2P network</li>
    <li>Share your URL with others or connect to their peer IDs</li>
    <li>Watch the real-time network visualization update as peers join/leave</li>
    <li>Drag nodes around to explore the network topology</li>
  </ol>

  <h3>What You're Seeing:</h3>
  <ul>
    <li><strong>Red node:</strong> Your browser in the mesh</li>
    <li><strong>Teal nodes:</strong> Peers you're directly connected to</li>
    <li><strong>Gray nodes:</strong> Peers you know about but aren't directly connected to</li>
    <li><strong>Thick lines:</strong> Your direct P2P connections</li>
    <li>
      <strong>Thin lines:</strong> Connections between other peers (discovered via heartbeats)
    </li>
  </ul>
</div>

<style>
  .instructions {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid #3498db;
  }

  .instructions h3 {
    margin-top: 0;
    color: #2c3e50;
  }

  .instructions ul,
  .instructions ol {
    margin: 1rem 0;
  }

  .instructions li {
    margin: 0.5rem 0;
  }
</style>
