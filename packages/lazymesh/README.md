# LazyMesh

A lightweight P2P mesh networking library using PeerJS for WebRTC connections.

## Features

- 🔗 **P2P Mesh Networking** - Connect directly to other peers without central servers
- 💓 **Heartbeat System** - Automatic peer discovery and mesh topology awareness
- 👋 **Graceful Shutdown** - Clean disconnection with proper peer notification
- 📨 **Ad-hoc Messaging** - Send custom messages to directly connected peers
- 🎯 **Event-driven** - React to mesh changes with typed events
- 🔧 **TypeScript** - Full type safety and IntelliSense support
- ⚡ **Lightweight** - Minimal dependencies, just PeerJS for WebRTC

## Core Functionality

### 1. Heartbeat Messages
- Sent periodically to all connected peers (default: every 5 seconds)
- Contains information about who the sender is connected to
- Updates mesh topology awareness across all nodes
- Enables automatic dead peer detection

### 2. Graceful Shutdown
- Sends shutdown messages to all connected peers before disconnecting
- Prevents peers from continuing to send messages to disconnected nodes
- Includes optional reason for shutdown
- Properly cleans up all resources and timers

### 3. Ad-hoc Messaging
- Send custom messages to directly connected peers only
- Simple `sendMessage(peerId, data)` API
- Broadcast to all connected peers with `broadcast(data)`
- Type-safe message handling with events

## Installation

```bash
npm install lazymesh
```

## Quick Start

```typescript
import { LazyMesh } from 'lazymesh';

// Create a mesh instance
const mesh = new LazyMesh({
  heartbeatInterval: 5000,  // Send heartbeat every 5 seconds
  peerTimeout: 15000,       // Consider peer dead after 15 seconds
  maxConnections: 10        // Maximum direct connections
});

// Connect to the mesh
const myPeerId = await mesh.connect();
console.log(`Connected to mesh with ID: ${myPeerId}`);

// Listen for events
mesh.on('peer:joined', ({ peerId, peerInfo }) => {
  console.log(`Peer ${peerId} joined the mesh`);
});

mesh.on('message:received', ({ from, data }) => {
  console.log(`Message from ${from}:`, data);
});

mesh.on('topology:changed', ({ peers }) => {
  console.log(`Mesh now has ${peers.size} known peers`);
});

// Connect to another peer (if you know their ID)
await mesh.connectToPeer('some-peer-id');

// Send a message to a specific peer
mesh.sendMessage('some-peer-id', { 
  type: 'chat', 
  message: 'Hello!' 
});

// Broadcast to all connected peers
mesh.broadcast({ 
  type: 'announcement', 
  message: 'Hello everyone!' 
});

// Gracefully disconnect
await mesh.disconnect('User logged out');
```

## API Reference

### LazyMesh Class

#### Constructor

```typescript
new LazyMesh(config?: LazyMeshConfig)
```

**Config Options:**
- `heartbeatInterval?: number` - How often to send heartbeats (ms, default: 5000)
- `peerTimeout?: number` - When to consider a peer dead (ms, default: 15000)  
- `maxConnections?: number` - Max direct connections (default: 10)

#### Methods

##### `connect(peerId?: string): Promise<string>`
Initialize and connect to the mesh. Returns the assigned peer ID.

##### `connectToPeer(targetPeerId: string): Promise<void>`
Connect to a specific peer by their ID.

##### `sendMessage(targetPeerId: string, data: any): boolean`
Send a message to a specific connected peer. Returns `true` if sent successfully.

##### `broadcast(data: any): number`
Broadcast a message to all connected peers. Returns number of peers reached.

##### `getConnectedPeers(): string[]`
Get list of directly connected peer IDs.

##### `getKnownPeers(): Map<string, PeerInfo>`
Get information about all known peers in the mesh (including indirect connections).

##### `disconnect(reason?: string): Promise<void>`
Gracefully disconnect from the mesh with optional reason.

#### Events

```typescript
mesh.on('mesh:connected', ({ peerId }) => {
  // Successfully connected to mesh
});

mesh.on('peer:joined', ({ peerId, peerInfo }) => {
  // New peer connected
});

mesh.on('peer:left', ({ peerId, reason }) => {
  // Peer disconnected
});

mesh.on('message:received', ({ from, data }) => {
  // Received user message
});

mesh.on('topology:changed', ({ peers }) => {
  // Mesh topology updated
});
```

### Types

#### `PeerInfo`
```typescript
interface PeerInfo {
  id: string;           // Peer ID
  lastSeen: number;     // Last heartbeat timestamp
  connections: string[]; // List of peer IDs this peer is connected to
}
```

#### Message Types
```typescript
// User message (your custom data)
interface UserMessage {
  type: 'user';
  from: string;
  timestamp: number;
  data: any;
}

// Heartbeat message (automatic)
interface HeartbeatMessage {
  type: 'heartbeat';
  from: string;
  timestamp: number;
  peerInfo: PeerInfo;
}

// Shutdown message (automatic)
interface ShutdownMessage {
  type: 'shutdown';
  from: string;
  timestamp: number;
  reason?: string;
}
```

## How It Works

### Mesh Topology Discovery
1. Each peer sends heartbeat messages containing their connection list
2. Peers build a map of the entire mesh topology
3. Dead peers are detected when heartbeats stop arriving
4. Topology changes trigger events for reactive UIs

### Connection Lifecycle
1. **Join**: Peer connects and starts sending heartbeats
2. **Discovery**: Other peers learn about the new peer through heartbeats
3. **Communication**: Direct messaging between connected peers
4. **Leave**: Graceful shutdown notifies all connected peers

### Message Flow
```
Peer A ←→ Peer B ←→ Peer C
  ↑                   ↑
  └─────── Peer D ────┘
```

- Messages only travel between directly connected peers
- Mesh topology is shared via heartbeats
- No message routing - keep it simple!

## Examples

### Chat Application
```typescript
const mesh = new LazyMesh();
await mesh.connect();

mesh.on('message:received', ({ from, data }) => {
  if (data.type === 'chat') {
    displayMessage(from, data.message);
  }
});

function sendChatMessage(message: string) {
  mesh.broadcast({
    type: 'chat',
    message,
    timestamp: Date.now()
  });
}
```

### File Sharing
```typescript
mesh.on('message:received', ({ from, data }) => {
  switch (data.type) {
    case 'file-request':
      if (hasFile(data.fileId)) {
        mesh.sendMessage(from, {
          type: 'file-offer',
          fileId: data.fileId,
          fileName: data.fileName
        });
      }
      break;
      
    case 'file-offer':
      downloadFile(from, data.fileId);
      break;
  }
});
```

### Collaborative Editing
```typescript
mesh.on('message:received', ({ from, data }) => {
  if (data.type === 'edit-operation') {
    applyOperation(data.operation);
    updateEditor();
  }
});

function sendEdit(operation: EditOperation) {
  mesh.broadcast({
    type: 'edit-operation',
    operation,
    timestamp: Date.now()
  });
}
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build the library
npm run build

# Watch mode for development
npm run dev
```

## Testing

The library includes comprehensive tests covering:
- Connection management and lifecycle
- Heartbeat system functionality  
- Graceful shutdown behavior
- Message sending and receiving
- Peer discovery and topology changes
- Error handling and edge cases

Run tests with: `npm test`

## Browser Support

LazyMesh works in any browser that supports WebRTC:
- Chrome 23+
- Firefox 22+  
- Safari 11+
- Edge 79+

## Limitations

- **Direct connections only** - No message routing through intermediate peers
- **WebRTC limitations** - Some corporate firewalls may block peer connections
- **No persistence** - Mesh topology is rebuilt when peers reconnect
- **Browser only** - Uses WebRTC, so Node.js support would require additional setup

## License

MIT - Feel free to use in any project! 