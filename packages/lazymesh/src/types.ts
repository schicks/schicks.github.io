/**
 * Core types for LazyMesh P2P networking
 */

import type { DataConnection } from 'peerjs';

/**
 * Unique identifier for a peer in the mesh
 */
export type PeerId = string;

/**
 * Information about a peer in the mesh
 */
export interface PeerInfo {
  /** Unique identifier for this peer */
  id: PeerId;
  /** Timestamp when this peer was last seen */
  lastSeen: number;
  /** List of peer IDs this peer is connected to */
  connections: PeerId[];
}

/**
 * Base message structure for all mesh communications
 */
export interface BaseMessage {
  /** Type of message */
  type: string;
  /** ID of the sender */
  from: PeerId;
  /** Timestamp when message was sent */
  timestamp: number;
}

/**
 * Heartbeat message sent periodically to announce presence and topology
 */
export interface HeartbeatMessage extends BaseMessage {
  type: 'heartbeat';
  /** Information about the sender's current state */
  peerInfo: PeerInfo;
}

/**
 * Graceful shutdown message sent when leaving the mesh
 */
export interface ShutdownMessage extends BaseMessage {
  type: 'shutdown';
  /** Reason for shutdown (optional) */
  reason?: string;
}

/**
 * Ad-hoc user message for custom communication
 */
export interface UserMessage extends BaseMessage {
  type: 'user';
  /** Custom payload data */
  data: any;
}

/**
 * Union type of all possible messages
 */
export type MeshMessage = HeartbeatMessage | ShutdownMessage | UserMessage;

/**
 * Connection wrapper that includes metadata
 */
export interface MeshConnection {
  /** The underlying PeerJS connection */
  connection: DataConnection;
  /** Information about the connected peer */
  peerInfo: PeerInfo;
  /** Whether this connection is currently active */
  isActive: boolean;
}

/**
 * Configuration options for LazyMesh
 */
export interface LazyMeshConfig {
  /** How often to send heartbeat messages (ms) */
  heartbeatInterval?: number;
  /** How long to wait before considering a peer dead (ms) */
  peerTimeout?: number;
  /** Maximum number of direct connections to maintain */
  maxConnections?: number;
}

/**
 * Events emitted by LazyMesh
 */
export interface LazyMeshEvents {
  /** Emitted when connected to the mesh */
  'mesh:connected': { peerId: PeerId };
  /** Emitted when a new peer joins */
  'peer:joined': { peerId: PeerId; peerInfo: PeerInfo };
  /** Emitted when a peer leaves */
  'peer:left': { peerId: PeerId; reason?: string };
  /** Emitted when receiving a user message */
  'message:received': { from: PeerId; data: any };
  /** Emitted when mesh topology changes */
  'topology:changed': { peers: Map<PeerId, PeerInfo> };
} 