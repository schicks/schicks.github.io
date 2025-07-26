<script lang="ts">
  import type { MeshState } from './types'

  export let state: MeshState
  export let connectToPeerInput: string = ''
  export let onConnect: () => void
  export let onDisconnect: () => void
  export let onConnectToPeer: () => void
  export let onShareURL: () => void

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      onConnectToPeer()
    }
  }
</script>

<div class="controls">
  <div class="status">
    {#if state.connecting}
      <span class="connecting">🔄 Connecting...</span>
    {:else if state.connected}
      <span class="connected">✅ Connected as: <strong>{state.myPeerId}</strong></span>
    {:else}
      <span class="disconnected">❌ Not connected</span>
    {/if}

    {#if state.statusMessage}
      <div class="status-message">{state.statusMessage}</div>
    {/if}

    {#if state.error}
      <div class="error">{state.error}</div>
    {/if}
  </div>

  <div class="actions">
    {#if !state.connected}
      <button on:click={onConnect} disabled={state.connecting}> Connect to Mesh </button>
    {:else}
      <button on:click={onDisconnect}>Disconnect</button>
      <button on:click={onShareURL}>Share URL</button>
    {/if}
  </div>

  {#if state.connected}
    <div class="peer-connect">
      <input
        bind:value={connectToPeerInput}
        placeholder="Enter peer ID to connect"
        on:keydown={handleKeyDown}
      />
      <button on:click={onConnectToPeer} disabled={!connectToPeerInput.trim()}>
        Connect to Peer
      </button>
    </div>
  {/if}
</div>

<style>
  .controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
  }

  .status {
    font-size: 1.1rem;
  }

  .connected {
    color: #27ae60;
  }

  .connecting {
    color: #f39c12;
  }

  .disconnected {
    color: #e74c3c;
  }

  .status-message {
    margin-top: 0.5rem;
    font-style: italic;
    color: #666;
  }

  .error {
    margin-top: 0.5rem;
    color: #e74c3c;
    font-weight: bold;
  }

  .actions {
    display: flex;
    gap: 1rem;
  }

  .peer-connect {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .peer-connect input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background: #3498db;
    color: white;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover:not(:disabled) {
    background: #2980b9;
  }

  button:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
</style>
