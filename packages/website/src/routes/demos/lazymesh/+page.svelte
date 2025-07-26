<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { page } from '$app/stores'
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'
  import { MeshService } from './mesh-service'
  import { copyToClipboard } from './mesh-utils'
  import type { MeshConfig, MeshEventHandlers, VisualizationConfig } from './types'
  import type { PeerInfo as LazyMeshPeerInfo } from 'lazymesh'
  import { removePeerIdsFromURL } from '$lib/url-utils.js'

  // Components
  import MeshControls from './MeshControls.svelte'
  import NetworkVisualization from './NetworkVisualization.svelte'
  import Instructions from './Instructions.svelte'

  let meshService: MeshService
  let connectToPeerInput = ''
  let cleanupInterval: NodeJS.Timeout | null = null

  // Reactive trigger to force state updates
  let stateUpdateTrigger = 0

  // Reactive state derived from mesh service
  $: meshState = meshService?.getState() || {
    mesh: null,
    myPeerId: '',
    connected: false,
    connecting: false,
    error: '',
    statusMessage: ''
  }

  // Force reactive update when trigger changes
  $: if (stateUpdateTrigger >= 0) {
    meshState = meshService?.getState() || {
      mesh: null,
      myPeerId: '',
      connected: false,
      connecting: false,
      error: '',
      statusMessage: ''
    }
  }

  // Visualization data
  let knownPeers: Map<string, LazyMeshPeerInfo> = new Map()
  let connectedPeers: string[] = []

  // Configuration
  const meshConfig: MeshConfig = {
    heartbeatInterval: 3000, // 3 seconds for demo
    peerTimeout: 10000, // 10 seconds timeout
    maxConnections: 10
  }

  const visualizationConfig: VisualizationConfig = {
    width: 800,
    height: 600
  }

  onMount(async () => {
    if (!browser) return

    // Create event handlers for mesh service
    const eventHandlers: MeshEventHandlers = {
      onMeshConnected: (data) => {
        stateUpdateTrigger++ // Force reactive update
        meshService.updateURL($page.url.toString(), goto)
        updateVisualizationData()
        meshService.autoConnectFromURL($page.url.toString(), goto)
      },
      onPeerJoined: () => {
        stateUpdateTrigger++ // Force reactive update
        updateVisualizationData()
      },
      onPeerLeft: () => {
        stateUpdateTrigger++ // Force reactive update
        updateVisualizationData()
      },
      onTopologyChanged: () => updateVisualizationData(),
      onMessage: () => {} // Could add message handling here
    }

    // Initialize mesh service
    meshService = new MeshService(meshConfig, eventHandlers)
    await meshService.initialize()

    // Start periodic cleanup of stale peer IDs from URL
    cleanupInterval = setInterval(() => {
      meshService.cleanupStaleURLPeersWithContext($page.url.toString(), goto)
    }, 30000)

    // Connect to mesh
    await meshService.connect()
  })

  onDestroy(() => {
    if (meshService) {
      meshService.destroy()
    }
    if (cleanupInterval) {
      clearInterval(cleanupInterval)
    }
  })

  function updateVisualizationData() {
    if (meshService) {
      const newKnownPeers = meshService.getKnownPeers()
      const newConnectedPeers = meshService.getConnectedPeers()

      knownPeers = newKnownPeers
      connectedPeers = newConnectedPeers
    }
  }

  // Control handlers
  async function handleConnect() {
    await meshService?.connect()
  }

  function handleDisconnect() {
    meshService?.disconnect()
    knownPeers = new Map()
    connectedPeers = []

    // Remove peers from URL
    const url = new URL($page.url)
    url.searchParams.delete('peers')
    goto(url.toString(), { replaceState: true, noScroll: true })
  }

  async function handleConnectToPeer() {
    if (!connectToPeerInput.trim() || !meshService) return

    const peerId = connectToPeerInput.trim()

    try {
      await meshService.connectToPeer(peerId)
      connectToPeerInput = ''
    } catch (err) {
      // Remove this failed peer ID from URL if it exists there
      const newUrl = removePeerIdsFromURL([peerId], $page.url.toString())
      goto(newUrl, { replaceState: true, noScroll: true })
    }
  }

  async function handleShareURL() {
    try {
      await copyToClipboard(window.location.href)
      // This should trigger a status update in the mesh service
      // For now, we could show a temporary message
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }
</script>

<svelte:head>
  <title>LazyMesh P2P Demo</title>
  <meta
    name="description"
    content="Interactive demo of LazyMesh peer-to-peer networking with real-time visualization"
  />
</svelte:head>

<main>
  <h1>LazyMesh P2P Network Demo</h1>

  <MeshControls
    state={meshState}
    bind:connectToPeerInput
    onConnect={handleConnect}
    onDisconnect={handleDisconnect}
    onConnectToPeer={handleConnectToPeer}
    onShareURL={handleShareURL}
  />

  <NetworkVisualization
    {knownPeers}
    {connectedPeers}
    myPeerId={meshState.myPeerId}
    config={visualizationConfig}
  />

  <Instructions />
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
</style>
