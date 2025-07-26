import { LazyMesh } from 'lazymesh'
import type { LazyMesh as LazyMeshType, PeerInfo as LazyMeshPeerInfo } from 'lazymesh'
import type { MeshState, MeshEventHandlers, MeshConfig } from './types'
import {
  removePeerIdsFromURL,
  addPeerIdToURL,
  getPeerIdsFromURL,
  findStalePeerIds
} from '$lib/url-utils.js'
import { withTimeout } from './mesh-utils'

export class MeshService {
  private mesh: LazyMeshType | null = null
  private state: MeshState
  private eventHandlers: MeshEventHandlers
  private cleanupInterval: NodeJS.Timeout | null = null
  private config: MeshConfig

  constructor(config: MeshConfig, eventHandlers: MeshEventHandlers) {
    this.config = config
    this.eventHandlers = eventHandlers
    this.state = {
      mesh: null,
      myPeerId: '',
      connected: false,
      connecting: false,
      error: '',
      statusMessage: ''
    }
  }

  getState(): MeshState {
    return { ...this.state }
  }

  async initialize(): Promise<void> {
    if (this.mesh) return

    this.mesh = new LazyMesh(this.config)
    this.state.mesh = this.mesh

    // Set up event listeners
    this.mesh.on('mesh:connected', this.handleMeshConnected.bind(this))
    this.mesh.on('peer:joined', this.handlePeerJoined.bind(this))
    this.mesh.on('peer:left', this.handlePeerLeft.bind(this))
    this.mesh.on('topology:changed', this.handleTopologyChanged.bind(this))
    this.mesh.on('message:received', this.handleMessage.bind(this))

    // Start periodic cleanup of stale peer IDs from URL
    this.cleanupInterval = setInterval(() => this.cleanupStaleURLPeers(), 30000)
  }

  async connect(): Promise<void> {
    if (this.state.connecting || this.state.connected || !this.mesh) return

    this.updateState({ connecting: true, error: '', statusMessage: 'Connecting to mesh...' })

    try {
      const peerId = await this.mesh.connect()
      this.updateState({ statusMessage: `Connected as ${peerId}` })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      this.updateState({
        error: `Failed to connect: ${errorMessage}`,
        statusMessage: '',
        connecting: false
      })
    }
  }

  async connectToPeer(peerId: string): Promise<void> {
    if (!this.state.connected || !this.mesh) {
      throw new Error('Not connected to mesh')
    }

    this.updateState({ statusMessage: `Connecting to ${peerId}...` })

    try {
      await withTimeout(this.mesh.connectToPeer(peerId), 10000)
      this.updateState({ statusMessage: `Connection initiated to ${peerId}` })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      const error = `Failed to connect to ${peerId}: ${errorMessage}`
      this.updateState({ error, statusMessage: '' })
      throw new Error(error)
    }
  }

  disconnect(): void {
    if (this.mesh && this.state.connected) {
      this.mesh.disconnect('User requested disconnect')
      this.updateState({
        connected: false,
        myPeerId: '',
        statusMessage: ''
      })
    }
  }

  destroy(): void {
    if (this.mesh) {
      this.mesh.disconnect('Page unload')
    }
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }
  }

  getKnownPeers(): Map<string, LazyMeshPeerInfo> {
    return this.mesh?.getKnownPeers() ?? new Map()
  }

  getConnectedPeers(): string[] {
    return this.mesh?.getConnectedPeers() ?? []
  }

  updateURL(currentUrl: string, goto: (url: string, options?: any) => void): void {
    if (!this.state.myPeerId) return

    const peerIds = getPeerIdsFromURL(currentUrl)

    // Add our own ID to the URL if it's not already there (for sharing)
    if (!peerIds.includes(this.state.myPeerId)) {
      const newUrl = addPeerIdToURL(this.state.myPeerId, currentUrl)
      goto(newUrl, { replaceState: true, noScroll: true })
    }
  }

  async autoConnectFromURL(currentUrl: string, goto: (url: string, options?: any) => void): Promise<void> {
    if (!this.state.connected || !this.state.myPeerId || !this.mesh) return

    const peerIds = getPeerIdsFromURL(currentUrl)
    if (peerIds.length === 0) return

    const failedPeerIds: string[] = []

    for (const peerId of peerIds) {
      // Skip our own peer ID to avoid connecting to ourselves
      if (peerId !== this.state.myPeerId) {
        try {
          await withTimeout(this.mesh.connectToPeer(peerId), 10000)
          this.updateState({ statusMessage: `Auto-connecting to ${peerId}...` })
        } catch (err) {
          console.warn(`Failed to auto-connect to ${peerId}:`, err)
          failedPeerIds.push(peerId)
        }
      }
    }

    // Remove failed peer IDs from URL if any failed
    if (failedPeerIds.length > 0) {
      const newUrl = removePeerIdsFromURL(failedPeerIds, currentUrl)
      goto(newUrl, { replaceState: true, noScroll: true })
    }
  }

  private cleanupStaleURLPeers(): void {
    // This method would need access to current URL and goto function
    // It's called from the component that has access to these
  }

  cleanupStaleURLPeersWithContext(currentUrl: string, goto: (url: string, options?: any) => void): void {
    if (!this.state.connected || !this.mesh) return

    const urlPeerIds = getPeerIdsFromURL(currentUrl)
    if (urlPeerIds.length === 0) return

    const connectedPeers = this.mesh.getConnectedPeers()
    const stalePeerIds = findStalePeerIds(urlPeerIds, connectedPeers, this.state.myPeerId)

    if (stalePeerIds.length > 0) {
      console.log('Cleaning up stale peer IDs from URL:', stalePeerIds)
      const newUrl = removePeerIdsFromURL(stalePeerIds, currentUrl)
      goto(newUrl, { replaceState: true, noScroll: true })
    }
  }

  private updateState(updates: Partial<MeshState>): void {
    this.state = { ...this.state, ...updates }
  }

  private handleMeshConnected(data: { peerId: string }): void {
    this.updateState({
      myPeerId: data.peerId,
      connected: true,
      connecting: false
    })
    this.eventHandlers.onMeshConnected(data)
  }

  private handlePeerJoined(data: { peerId: string; peerInfo: LazyMeshPeerInfo }): void {
    this.updateState({ statusMessage: `${data.peerId} joined the mesh` })
    this.eventHandlers.onPeerJoined(data)
  }

  private handlePeerLeft(data: { peerId: string; reason?: string }): void {
    const { peerId, reason } = data
    this.updateState({ statusMessage: `${peerId} left the mesh${reason ? ` (${reason})` : ''}` })
    this.eventHandlers.onPeerLeft(data)
  }

  private handleTopologyChanged(data: { peers: Map<string, LazyMeshPeerInfo> }): void {
    this.eventHandlers.onTopologyChanged(data)
  }

  private handleMessage(data: { from: string; data: unknown }): void {
    console.log(`Message from ${data.from}:`, data.data)
    this.eventHandlers.onMessage(data)
  }
} 