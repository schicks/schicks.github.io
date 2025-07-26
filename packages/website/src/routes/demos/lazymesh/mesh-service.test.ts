import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest'
import { MeshService } from './mesh-service'
import type { MeshConfig, MeshEventHandlers } from './types'

// Mock the lazymesh module
vi.mock('lazymesh', () => ({
  LazyMesh: vi.fn()
}))

// Mock the url-utils module
vi.mock('$lib/url-utils.js', () => ({
  removePeerIdsFromURL: vi.fn((peerIds, url) => url),
  addPeerIdToURL: vi.fn((peerId, url) => `${url}?peer=${peerId}`),
  getPeerIdsFromURL: vi.fn(() => []),
  findStalePeerIds: vi.fn(() => [])
}))

describe('MeshService', () => {
  let meshService: MeshService
  let mockConfig: MeshConfig
  let mockEventHandlers: MeshEventHandlers
  let mockMesh: any

  beforeEach(() => {
    // Create mock mesh instance
    mockMesh = {
      on: vi.fn(),
      connect: vi.fn().mockResolvedValue('test-peer-id'),
      connectToPeer: vi.fn().mockResolvedValue(undefined),
      disconnect: vi.fn(),
      getKnownPeers: vi.fn().mockReturnValue(new Map()),
      getConnectedPeers: vi.fn().mockReturnValue([])
    }

    // Mock LazyMesh constructor
    const { LazyMesh } = require('lazymesh')
      ; (LazyMesh as any).mockImplementation(() => mockMesh)

    mockConfig = {
      heartbeatInterval: 1000,
      peerTimeout: 5000,
      maxConnections: 5
    }

    mockEventHandlers = {
      onMeshConnected: vi.fn(),
      onPeerJoined: vi.fn(),
      onPeerLeft: vi.fn(),
      onTopologyChanged: vi.fn(),
      onMessage: vi.fn()
    }

    meshService = new MeshService(mockConfig, mockEventHandlers)
  })

  describe('initialization', () => {
    it('should initialize with correct config and handlers', () => {
      expect(meshService).toBeDefined()
      expect(meshService.getState().connected).toBe(false)
      expect(meshService.getState().myPeerId).toBe('')
    })

    it('should create mesh instance on initialize', async () => {
      await meshService.initialize()

      const { LazyMesh } = require('lazymesh')
      expect(LazyMesh).toHaveBeenCalledWith(mockConfig)
      expect(mockMesh.on).toHaveBeenCalledTimes(5) // 5 event listeners
    })
  })

  describe('connection management', () => {
    beforeEach(async () => {
      await meshService.initialize()
    })

    it('should connect to mesh successfully', async () => {
      await meshService.connect()

      expect(mockMesh.connect).toHaveBeenCalled()
      expect(meshService.getState().connecting).toBe(false)
    })

    it('should handle connection errors', async () => {
      mockMesh.connect.mockRejectedValueOnce(new Error('Connection failed'))

      await meshService.connect()

      const state = meshService.getState()
      expect(state.error).toContain('Failed to connect: Connection failed')
      expect(state.connecting).toBe(false)
    })

    it('should connect to peer successfully', async () => {
      // Simulate being connected first
      meshService['state'].connected = true

      await meshService.connectToPeer('peer-123')

      expect(mockMesh.connectToPeer).toHaveBeenCalledWith('peer-123')
    })

    it('should throw error when connecting to peer while not connected', async () => {
      await expect(meshService.connectToPeer('peer-123')).rejects.toThrow('Not connected to mesh')
    })

    it('should disconnect successfully', () => {
      meshService['state'].connected = true
      meshService['state'].myPeerId = 'test-peer'

      meshService.disconnect()

      expect(mockMesh.disconnect).toHaveBeenCalledWith('User requested disconnect')
      expect(meshService.getState().connected).toBe(false)
      expect(meshService.getState().myPeerId).toBe('')
    })
  })

  describe('event handling', () => {
    beforeEach(async () => {
      await meshService.initialize()
    })

    it('should handle mesh connected event', () => {
      const eventData = { peerId: 'test-peer-123' }

      // Simulate the event handler being called
      meshService['handleMeshConnected'](eventData)

      const state = meshService.getState()
      expect(state.myPeerId).toBe('test-peer-123')
      expect(state.connected).toBe(true)
      expect(state.connecting).toBe(false)
      expect(mockEventHandlers.onMeshConnected).toHaveBeenCalledWith(eventData)
    })

    it('should handle peer joined event', () => {
      const eventData = { peerId: 'new-peer', peerInfo: {} as any }

      meshService['handlePeerJoined'](eventData)

      expect(meshService.getState().statusMessage).toContain('new-peer joined')
      expect(mockEventHandlers.onPeerJoined).toHaveBeenCalledWith(eventData)
    })

    it('should handle peer left event', () => {
      const eventData = { peerId: 'old-peer', reason: 'timeout' }

      meshService['handlePeerLeft'](eventData)

      expect(meshService.getState().statusMessage).toContain('old-peer left')
      expect(mockEventHandlers.onPeerLeft).toHaveBeenCalledWith(eventData)
    })
  })

  describe('utility methods', () => {
    beforeEach(async () => {
      await meshService.initialize()
    })

    it('should return known peers', () => {
      const mockPeers = new Map([['peer1', {} as any]])
      mockMesh.getKnownPeers.mockReturnValue(mockPeers)

      const result = meshService.getKnownPeers()

      expect(result).toBe(mockPeers)
    })

    it('should return connected peers', () => {
      const mockConnectedPeers = ['peer1', 'peer2']
      mockMesh.getConnectedPeers.mockReturnValue(mockConnectedPeers)

      const result = meshService.getConnectedPeers()

      expect(result).toBe(mockConnectedPeers)
    })

    it('should update URL when connected', () => {
      meshService['state'].myPeerId = 'test-peer'
      const mockGoto = vi.fn()

      const { addPeerIdToURL, getPeerIdsFromURL } = require('$lib/url-utils.js')
        ; (getPeerIdsFromURL as MockedFunction<any>).mockReturnValue([])

      meshService.updateURL('http://test.com', mockGoto)

      expect(addPeerIdToURL).toHaveBeenCalledWith('test-peer', 'http://test.com')
      expect(mockGoto).toHaveBeenCalled()
    })
  })

  describe('cleanup', () => {
    it('should clean up resources on destroy', () => {
      meshService['mesh'] = mockMesh
      meshService['cleanupInterval'] = setInterval(() => { }, 1000) as any

      meshService.destroy()

      expect(mockMesh.disconnect).toHaveBeenCalledWith('Page unload')
    })
  })

  describe('single peer behavior', () => {
    beforeEach(async () => {
      await meshService.initialize()
    })

    it('should have known peers including local peer when connected alone', () => {
      // Mock a single local peer
      const localPeerInfo = {
        id: 'local-peer',
        lastSeen: Date.now(),
        connections: []
      }
      const mockPeers = new Map([['local-peer', localPeerInfo]])
      mockMesh.getKnownPeers.mockReturnValue(mockPeers)
      mockMesh.getConnectedPeers.mockReturnValue([]) // No connections to other peers

      // Simulate mesh connected event
      meshService['handleMeshConnected']({ peerId: 'local-peer' })

      const knownPeers = meshService.getKnownPeers()
      const connectedPeers = meshService.getConnectedPeers()

      expect(knownPeers.size).toBe(1)
      expect(knownPeers.has('local-peer')).toBe(true)
      expect(connectedPeers).toHaveLength(0)
      expect(meshService.getState().connected).toBe(true)
    })
  })
}) 