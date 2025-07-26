/**
 * LazyMesh - A lightweight P2P mesh networking library
 */

import Peer, { DataConnection } from 'peerjs';
import type {
  PeerId,
  PeerInfo,
  MeshMessage,
  HeartbeatMessage,
  ShutdownMessage,
  UserMessage,
  MeshConnection,
  LazyMeshConfig,
  LazyMeshEvents,
} from './types';

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: Required<LazyMeshConfig> = {
  heartbeatInterval: 5000, // 5 seconds
  peerTimeout: 15000, // 15 seconds
  maxConnections: 10, // Max direct connections
};

/**
 * Simple event emitter for LazyMesh events
 */
class EventEmitter<T extends Record<string, any>> {
  private listeners: Map<keyof T, Set<Function>> = new Map();

  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
  }

  off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(listener);
    }
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(data));
    }
  }
}

/**
 * LazyMesh - Main class for P2P mesh networking
 */
export class LazyMesh extends EventEmitter<LazyMeshEvents> {
  private peer: Peer | null = null;
  private config: Required<LazyMeshConfig>;
  private connections: Map<PeerId, MeshConnection> = new Map();
  private knownPeers: Map<PeerId, PeerInfo> = new Map();
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private cleanupTimer: NodeJS.Timeout | null = null;
  private isShuttingDown = false;

  constructor(config: LazyMeshConfig = {}) {
    super();
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Initialize and connect to the mesh
   */
  async connect(peerId?: PeerId): Promise<PeerId> {
    if (this.peer) {
      throw new Error('Already connected to mesh');
    }

    return new Promise((resolve, reject) => {
      this.peer = peerId ? new Peer(peerId) : new Peer();

      this.peer.on('open', (id) => {
        this.setupPeerEventHandlers();
        this.startHeartbeat();
        this.startCleanupTimer();

        // Add ourselves to the known peers map
        const localPeerInfo: PeerInfo = {
          id,
          lastSeen: Date.now(),
          connections: []
        };
        this.knownPeers.set(id, localPeerInfo);

        this.emit('mesh:connected', { peerId: id });
        resolve(id);
      });

      this.peer.on('error', (error) => {
        reject(error);
      });
    });
  }

  /**
   * Connect to a specific peer
   */
  async connectToPeer(targetPeerId: PeerId): Promise<void> {
    if (!this.peer) {
      throw new Error('Not connected to mesh');
    }

    if (this.connections.has(targetPeerId)) {
      return; // Already connected
    }

    if (this.connections.size >= this.config.maxConnections) {
      throw new Error('Maximum connections reached');
    }

    const connection = this.peer.connect(targetPeerId);
    this.setupConnectionHandlers(connection);
  }

  /**
   * Send a user message to a specific peer
   */
  sendMessage(targetPeerId: PeerId, data: any): boolean {
    const meshConnection = this.connections.get(targetPeerId);
    if (!meshConnection || !meshConnection.isActive) {
      return false;
    }

    const message: UserMessage = {
      type: 'user',
      from: this.peer!.id,
      timestamp: Date.now(),
      data,
    };

    try {
      meshConnection.connection.send(message);
      return true;
    } catch (error) {
      console.error('Failed to send message:', error);
      return false;
    }
  }

  /**
   * Broadcast a user message to all connected peers
   */
  broadcast(data: any): number {
    let sentCount = 0;
    for (const [peerId] of this.connections) {
      if (this.sendMessage(peerId, data)) {
        sentCount++;
      }
    }
    return sentCount;
  }

  /**
   * Get list of directly connected peers
   */
  getConnectedPeers(): PeerId[] {
    const connected = Array.from(this.connections.keys()).filter(
      (peerId) => this.connections.get(peerId)?.isActive
    );
    return connected;
  }

  /**
   * Get information about all known peers in the mesh
   */
  getKnownPeers(): Map<PeerId, PeerInfo> {
    return new Map(this.knownPeers);
  }

  /**
   * Gracefully disconnect from the mesh
   */
  async disconnect(reason?: string): Promise<void> {
    if (!this.peer || this.isShuttingDown) {
      return;
    }

    this.isShuttingDown = true;

    // Send shutdown message to all connected peers
    const shutdownMessage: ShutdownMessage = {
      type: 'shutdown',
      from: this.peer.id,
      timestamp: Date.now(),
      reason,
    };

    for (const meshConnection of this.connections.values()) {
      if (meshConnection.isActive) {
        try {
          meshConnection.connection.send(shutdownMessage);
        } catch (error) {
          console.error('Failed to send shutdown message:', error);
        }
      }
    }

    // Clean up timers
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }

    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }

    // Close all connections
    for (const meshConnection of this.connections.values()) {
      meshConnection.connection.close();
    }

    // Destroy peer
    this.peer.destroy();
    this.peer = null;

    // Clear state
    this.connections.clear();
    this.knownPeers.clear();
    this.isShuttingDown = false;
  }

  /**
   * Set up event handlers for the peer
   */
  private setupPeerEventHandlers(): void {
    if (!this.peer) return;

    this.peer.on('connection', (connection) => {
      this.setupConnectionHandlers(connection);
    });

    this.peer.on('error', (error) => {
      console.error('Peer error:', error);
    });
  }

  /**
   * Set up event handlers for a data connection
   */
  private setupConnectionHandlers(connection: DataConnection): void {
    const peerId = connection.peer;

    connection.on('open', () => {
      const peerInfo: PeerInfo = {
        id: peerId,
        lastSeen: Date.now(),
        connections: [],
      };

      const meshConnection: MeshConnection = {
        connection,
        peerInfo,
        isActive: true,
      };

      this.connections.set(peerId, meshConnection);
      this.knownPeers.set(peerId, peerInfo);

      this.emit('peer:joined', { peerId, peerInfo });
      this.emit('topology:changed', { peers: this.getKnownPeers() });
    });

    connection.on('data', (data) => {
      this.handleMessage(data as MeshMessage);
    });

    connection.on('close', () => {
      this.handlePeerDisconnect(peerId);
    });

    connection.on('error', (error) => {
      console.error(`[LazyMesh DEBUG] Connection error with ${peerId}:`, error);
      this.handlePeerDisconnect(peerId);
    });
  }

  /**
   * Handle incoming messages
   */
  private handleMessage(message: MeshMessage): void {
    switch (message.type) {
      case 'heartbeat':
        this.handleHeartbeat(message);
        break;
      case 'shutdown':
        this.handleShutdown(message);
        break;
      case 'user':
        this.handleUserMessage(message);
        break;
      default:
        console.warn('Unknown message type:', message);
    }
  }

  /**
   * Handle heartbeat messages
   */
  private handleHeartbeat(message: HeartbeatMessage): void {
    const { peerInfo } = message;

    // Update known peer info
    this.knownPeers.set(peerInfo.id, {
      ...peerInfo,
      lastSeen: Date.now(),
    });

    // Update connection info if we have a direct connection
    const meshConnection = this.connections.get(peerInfo.id);
    if (meshConnection) {
      meshConnection.peerInfo = {
        ...peerInfo,
        lastSeen: Date.now(),
      };
    }

    // Update our knowledge of the mesh topology
    this.emit('topology:changed', { peers: this.getKnownPeers() });
  }

  /**
   * Handle shutdown messages
   */
  private handleShutdown(message: ShutdownMessage): void {
    this.handlePeerDisconnect(message.from, message.reason);
  }

  /**
   * Handle user messages
   */
  private handleUserMessage(message: UserMessage): void {
    this.emit('message:received', {
      from: message.from,
      data: message.data,
    });
  }

  /**
   * Handle peer disconnection
   */
  private handlePeerDisconnect(peerId: PeerId, reason?: string): void {
    const meshConnection = this.connections.get(peerId);
    if (meshConnection) {
      meshConnection.isActive = false;
      this.connections.delete(peerId);
    }

    this.knownPeers.delete(peerId);

    this.emit('peer:left', { peerId, reason });
    this.emit('topology:changed', { peers: this.getKnownPeers() });
  }

  /**
   * Start sending heartbeat messages
   */
  private startHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
    }

    this.heartbeatTimer = setInterval(() => {
      if (!this.peer || this.isShuttingDown) return;

      const connectedPeers = this.getConnectedPeers();

      // Update our own peer info in knownPeers with current connections
      const localPeerInfo: PeerInfo = {
        id: this.peer.id,
        lastSeen: Date.now(),
        connections: connectedPeers,
      };
      this.knownPeers.set(this.peer.id, localPeerInfo);

      const heartbeatMessage: HeartbeatMessage = {
        type: 'heartbeat',
        from: this.peer.id,
        timestamp: Date.now(),
        peerInfo: localPeerInfo,
      };

      // Send heartbeat to all connected peers
      for (const meshConnection of this.connections.values()) {
        if (meshConnection.isActive) {
          try {
            meshConnection.connection.send(heartbeatMessage);
          } catch (error) {
            console.error('Failed to send heartbeat:', error);
          }
        }
      }
    }, this.config.heartbeatInterval);
  }

  /**
   * Start cleanup timer for dead peers
   */
  private startCleanupTimer(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    this.cleanupTimer = setInterval(() => {
      const now = Date.now();
      const deadPeers: PeerId[] = [];

      for (const [peerId, peerInfo] of this.knownPeers) {
        if (now - peerInfo.lastSeen > this.config.peerTimeout) {
          deadPeers.push(peerId);
        }
      }

      for (const peerId of deadPeers) {
        this.handlePeerDisconnect(peerId, 'timeout');
      }
    }, this.config.heartbeatInterval);
  }
} 