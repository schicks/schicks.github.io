import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LazyMesh } from './utils';
import type { PeerId, PeerInfo, HeartbeatMessage, ShutdownMessage, UserMessage } from './types';

// Mock PeerJS
const mockConnection = {
  peer: 'test-peer-2',
  send: vi.fn(),
  close: vi.fn(),
  on: vi.fn(),
};

const mockPeer = {
  id: 'test-peer-1',
  connect: vi.fn(() => mockConnection),
  destroy: vi.fn(),
  on: vi.fn(),
};

vi.mock('peerjs', () => ({
  Peer: vi.fn(() => mockPeer),
  default: vi.fn(() => mockPeer),
}));

describe('LazyMesh', () => {
  let mesh: LazyMesh;
  let peerOpenCallback: (id: string) => void;
  let connectionOpenCallback: () => void;
  let connectionDataCallback: (data: any) => void;

  beforeEach(() => {
    vi.clearAllMocks();

    // Set up mock event handlers
    mockPeer.on.mockImplementation((event: string, callback: Function) => {
      if (event === 'open') {
        peerOpenCallback = callback;
      }
    });

    mockConnection.on.mockImplementation((event: string, callback: Function) => {
      if (event === 'open') {
        connectionOpenCallback = callback;
      } else if (event === 'data') {
        connectionDataCallback = callback;
      }
    });

    mesh = new LazyMesh({
      heartbeatInterval: 100, // Fast for testing
      peerTimeout: 300,
      maxConnections: 5,
    });
  });

  afterEach(async () => {
    await mesh.disconnect();
  });

  describe('Connection Management', () => {
    it('should connect to mesh and get peer ID', async () => {
      const connectPromise = mesh.connect();

      // Simulate peer opening
      peerOpenCallback('test-peer-1');

      const peerId = await connectPromise;
      expect(peerId).toBe('test-peer-1');
    });

    it('should throw error when connecting twice', async () => {
      const connectPromise = mesh.connect();
      peerOpenCallback('test-peer-1');
      await connectPromise;

      await expect(mesh.connect()).rejects.toThrow('Already connected to mesh');
    });

    it('should connect to another peer', async () => {
      const connectPromise = mesh.connect();
      peerOpenCallback('test-peer-1');
      await connectPromise;

      await mesh.connectToPeer('test-peer-2');

      expect(mockPeer.connect).toHaveBeenCalledWith('test-peer-2');
    });

    it('should not connect to same peer twice', async () => {
      const connectPromise = mesh.connect();
      peerOpenCallback('test-peer-1');
      await connectPromise;

      await mesh.connectToPeer('test-peer-2');
      connectionOpenCallback(); // Simulate connection opening

      await mesh.connectToPeer('test-peer-2'); // Try again

      expect(mockPeer.connect).toHaveBeenCalledTimes(1);
    });

    it('should enforce max connections limit', async () => {
      const connectPromise = mesh.connect();
      peerOpenCallback('test-peer-1');
      await connectPromise;

      // Fill up to max connections by simulating successful connections
      for (let i = 0; i < 5; i++) {
        await mesh.connectToPeer(`peer-${i}`);
        // Simulate the connection opening to count towards the limit
        const newMockConnection = {
          peer: `peer-${i}`,
          send: vi.fn(),
          close: vi.fn(),
          on: vi.fn(),
        };
        newMockConnection.on.mockImplementation((event: string, callback: Function) => {
          if (event === 'open') {
            callback(); // Immediately trigger open to register the connection
          }
        });
        // Manually trigger the connection handler to simulate real behavior
        const connectionHandler = mockPeer.on.mock.calls.find(call => call[0] === 'connection')?.[1];
        if (connectionHandler) {
          connectionHandler(newMockConnection);
        }
      }

      await expect(mesh.connectToPeer('peer-overflow')).rejects.toThrow('Maximum connections reached');
    });
  });

  describe('Messaging', () => {
    beforeEach(async () => {
      const connectPromise = mesh.connect();
      peerOpenCallback('test-peer-1');
      await connectPromise;

      await mesh.connectToPeer('test-peer-2');
      connectionOpenCallback();
    });

    it('should send user message to specific peer', () => {
      const testData = { message: 'Hello, peer!' };
      const result = mesh.sendMessage('test-peer-2', testData);

      expect(result).toBe(true);
      expect(mockConnection.send).toHaveBeenCalledWith({
        type: 'user',
        from: 'test-peer-1',
        timestamp: expect.any(Number),
        data: testData,
      });
    });

    it('should return false when sending to disconnected peer', () => {
      const result = mesh.sendMessage('non-existent-peer', { test: true });
      expect(result).toBe(false);
    });

    it('should broadcast message to all connected peers', () => {
      const testData = { broadcast: 'Hello, everyone!' };
      const sentCount = mesh.broadcast(testData);

      expect(sentCount).toBe(1);
      expect(mockConnection.send).toHaveBeenCalled();
    });

    it('should receive and emit user messages', () => {
      const messageHandler = vi.fn();
      mesh.on('message:received', messageHandler);

      const userMessage: UserMessage = {
        type: 'user',
        from: 'test-peer-2',
        timestamp: Date.now(),
        data: { test: 'data' },
      };

      connectionDataCallback(userMessage);

      expect(messageHandler).toHaveBeenCalledWith({
        from: 'test-peer-2',
        data: { test: 'data' },
      });
    });
  });

  describe('Heartbeat System', () => {
    beforeEach(async () => {
      const connectPromise = mesh.connect();
      peerOpenCallback('test-peer-1');
      await connectPromise;

      await mesh.connectToPeer('test-peer-2');
      connectionOpenCallback();
    });

    it('should send heartbeat messages periodically', (done) => {
      vi.spyOn(mockConnection, 'send');

      setTimeout(() => {
        const heartbeatCalls = mockConnection.send.mock.calls.filter(
          (call) => call[0].type === 'heartbeat'
        );

        expect(heartbeatCalls.length).toBeGreaterThan(0);

        const heartbeat = heartbeatCalls[0][0] as HeartbeatMessage;
        expect(heartbeat.type).toBe('heartbeat');
        expect(heartbeat.from).toBe('test-peer-1');
        expect(heartbeat.peerInfo.id).toBe('test-peer-1');
        expect(heartbeat.peerInfo.connections).toContain('test-peer-2');

        done();
      }, 150); // Wait for at least one heartbeat
    });

    it('should handle incoming heartbeat messages', () => {
      const topologyHandler = vi.fn();
      mesh.on('topology:changed', topologyHandler);

      const heartbeat: HeartbeatMessage = {
        type: 'heartbeat',
        from: 'test-peer-2',
        timestamp: Date.now(),
        peerInfo: {
          id: 'test-peer-2',
          lastSeen: Date.now(),
          connections: ['test-peer-1', 'test-peer-3'],
        },
      };

      connectionDataCallback(heartbeat);

      expect(topologyHandler).toHaveBeenCalled();

      const knownPeers = mesh.getKnownPeers();
      expect(knownPeers.has('test-peer-2')).toBe(true);
      expect(knownPeers.get('test-peer-2')?.connections).toEqual(['test-peer-1', 'test-peer-3']);
    });

    it('should update peer last seen timestamp', () => {
      const heartbeat: HeartbeatMessage = {
        type: 'heartbeat',
        from: 'test-peer-2',
        timestamp: Date.now(),
        peerInfo: {
          id: 'test-peer-2',
          lastSeen: Date.now() - 1000, // 1 second ago
          connections: [],
        },
      };

      connectionDataCallback(heartbeat);

      const knownPeers = mesh.getKnownPeers();
      const peer = knownPeers.get('test-peer-2');
      expect(peer?.lastSeen).toBeGreaterThan(heartbeat.peerInfo.lastSeen);
    });
  });

  describe('Graceful Shutdown', () => {
    beforeEach(async () => {
      const connectPromise = mesh.connect();
      peerOpenCallback('test-peer-1');
      await connectPromise;

      await mesh.connectToPeer('test-peer-2');
      connectionOpenCallback();
    });

    it('should send shutdown message when disconnecting', async () => {
      await mesh.disconnect('Test shutdown');

      const shutdownCalls = mockConnection.send.mock.calls.filter(
        (call) => call[0].type === 'shutdown'
      );

      expect(shutdownCalls.length).toBe(1);

      const shutdown = shutdownCalls[0][0] as ShutdownMessage;
      expect(shutdown.type).toBe('shutdown');
      expect(shutdown.from).toBe('test-peer-1');
      expect(shutdown.reason).toBe('Test shutdown');
    });

    it('should handle incoming shutdown messages', () => {
      const peerLeftHandler = vi.fn();
      mesh.on('peer:left', peerLeftHandler);

      const shutdown: ShutdownMessage = {
        type: 'shutdown',
        from: 'test-peer-2',
        timestamp: Date.now(),
        reason: 'User initiated',
      };

      connectionDataCallback(shutdown);

      expect(peerLeftHandler).toHaveBeenCalledWith({
        peerId: 'test-peer-2',
        reason: 'User initiated',
      });
    });

    it('should clean up resources on disconnect', async () => {
      await mesh.disconnect();

      expect(mockConnection.close).toHaveBeenCalled();
      expect(mockPeer.destroy).toHaveBeenCalled();
      expect(mesh.getConnectedPeers()).toHaveLength(0);
      expect(mesh.getKnownPeers().size).toBe(0);
    });
  });

  describe('Peer Management', () => {
    beforeEach(async () => {
      const connectPromise = mesh.connect();
      peerOpenCallback('test-peer-1');
      await connectPromise;

      await mesh.connectToPeer('test-peer-2');
      connectionOpenCallback();
    });

    it('should track connected peers', () => {
      const connectedPeers = mesh.getConnectedPeers();
      expect(connectedPeers).toContain('test-peer-2');
    });

    it('should emit peer:joined event when peer connects', () => {
      const joinedHandler = vi.fn();
      mesh.on('peer:joined', joinedHandler);

      // Simulate new connection
      const newMockConnection = {
        peer: 'test-peer-3',
        send: vi.fn(),
        close: vi.fn(),
        on: vi.fn(),
      };

      newMockConnection.on.mockImplementation((event: string, callback: Function) => {
        if (event === 'open') {
          callback(); // Immediately trigger open
        }
      });

      // This would be called by the peer 'connection' event
      const connectionHandler = mockPeer.on.mock.calls.find(
        call => call[0] === 'connection'
      )?.[1];

      if (connectionHandler) {
        connectionHandler(newMockConnection);
      }

      expect(joinedHandler).toHaveBeenCalledWith({
        peerId: 'test-peer-3',
        peerInfo: expect.objectContaining({
          id: 'test-peer-3',
          connections: [],
        }),
      });
    });

    it('should remove peers from known peers when they disconnect', () => {
      // Simulate peer disconnect
      const connectionCloseHandler = mockConnection.on.mock.calls.find(
        call => call[0] === 'close'
      )?.[1];

      if (connectionCloseHandler) {
        connectionCloseHandler();
      }

      expect(mesh.getKnownPeers().has('test-peer-2')).toBe(false);
      expect(mesh.getConnectedPeers()).not.toContain('test-peer-2');
    });
  });

  describe('Configuration', () => {
    it('should use default configuration when not provided', () => {
      const defaultMesh = new LazyMesh();
      // Test that default config is applied (we can't directly access private config)
      expect(defaultMesh).toBeInstanceOf(LazyMesh);
    });

    it('should merge provided config with defaults', () => {
      const customMesh = new LazyMesh({
        heartbeatInterval: 1000,
        maxConnections: 20,
      });
      expect(customMesh).toBeInstanceOf(LazyMesh);
    });
  });

  describe('Error Handling', () => {
    it('should handle connection errors gracefully', async () => {
      const connectPromise = mesh.connect();
      peerOpenCallback('test-peer-1');
      await connectPromise;

      await mesh.connectToPeer('test-peer-2');
      connectionOpenCallback(); // Establish the connection first

      const errorHandler = vi.fn();
      mesh.on('peer:left', errorHandler);

      // Simulate connection error
      const connectionErrorHandler = mockConnection.on.mock.calls.find(
        call => call[0] === 'error'
      )?.[1];

      if (connectionErrorHandler) {
        connectionErrorHandler(new Error('Connection failed'));
      }

      expect(errorHandler).toHaveBeenCalled();
    });

    it('should throw error when sending message without connection', () => {
      expect(() => mesh.sendMessage('non-existent', { test: true })).not.toThrow();
      expect(mesh.sendMessage('non-existent', { test: true })).toBe(false);
    });
  });

  describe('Single Peer Behavior', () => {
    it('should include local peer in known peers when connected alone', async () => {
      const connectPromise = mesh.connect();
      peerOpenCallback('test-peer-1');
      await connectPromise;

      // A single connected peer should still appear in knownPeers
      const knownPeers = mesh.getKnownPeers();
      expect(knownPeers.size).toBe(1);
      expect(knownPeers.has('test-peer-1')).toBe(true);

      const localPeer = knownPeers.get('test-peer-1');
      expect(localPeer).toEqual({
        id: 'test-peer-1',
        lastSeen: expect.any(Number),
        connections: []
      });
    });

    it('should have empty connected peers but non-empty known peers for single peer', async () => {
      const connectPromise = mesh.connect();
      peerOpenCallback('test-peer-1');
      await connectPromise;

      // Connected peers should be empty (no connections to others)
      expect(mesh.getConnectedPeers()).toHaveLength(0);

      // But known peers should include ourselves
      expect(mesh.getKnownPeers().size).toBe(1);
    });
  });
}); 