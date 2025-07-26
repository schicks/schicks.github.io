import type { SimulationNodeDatum, SimulationLinkDatum, Simulation } from 'd3'
import type { LazyMesh, PeerInfo as LazyMeshPeerInfo } from 'lazymesh'

// D3 visualization types
export interface Node extends SimulationNodeDatum {
  id: string
  isMe: boolean
  isConnected: boolean
  peerInfo?: LazyMeshPeerInfo
}

export interface Link extends SimulationLinkDatum<Node> {
  source: string | Node
  target: string | Node
  isDirect: boolean
}

// Mesh state types
export interface MeshState {
  mesh: LazyMesh | null
  myPeerId: string
  connected: boolean
  connecting: boolean
  error: string
  statusMessage: string
}

// Event handler types
export interface MeshEventHandlers {
  onMeshConnected: (data: { peerId: string }) => void
  onPeerJoined: (data: { peerId: string; peerInfo: LazyMeshPeerInfo }) => void
  onPeerLeft: (data: { peerId: string; reason?: string }) => void
  onTopologyChanged: (data: { peers: Map<string, LazyMeshPeerInfo> }) => void
  onMessage: (data: { from: string; data: unknown }) => void
}

// Configuration types
export interface MeshConfig {
  heartbeatInterval: number
  peerTimeout: number
  maxConnections: number
}

export interface VisualizationConfig {
  width: number
  height: number
} 