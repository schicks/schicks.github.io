/**
 * URL utilities for managing peer IDs in LazyMesh demo
 */

/**
 * Remove specific peer IDs from a URL's peers parameter
 * @param {string[]} peerIdsToRemove - Array of peer IDs to remove
 * @param {string} urlString - The URL string to modify
 * @returns {string} - The modified URL string
 */
export function removePeerIdsFromURL(peerIdsToRemove, urlString) {
  const url = new URL(urlString);
  const existingPeers = url.searchParams.get('peers');

  if (!existingPeers) return url.toString();

  const peerIds = existingPeers
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)
    .filter((id) => !peerIdsToRemove.includes(id));

  if (peerIds.length > 0) {
    url.searchParams.set('peers', peerIds.join(','));
  } else {
    url.searchParams.delete('peers');
  }

  return url.toString();
}

/**
 * Add a peer ID to a URL's peers parameter if not already present
 * @param {string} peerIdToAdd - The peer ID to add
 * @param {string} urlString - The URL string to modify
 * @returns {string} - The modified URL string
 */
export function addPeerIdToURL(peerIdToAdd, urlString) {
  const url = new URL(urlString);
  const existingPeers = url.searchParams.get('peers');
  const peerIds = existingPeers
    ? existingPeers.split(',').map(id => id.trim()).filter(Boolean)
    : [];

  if (!peerIds.includes(peerIdToAdd)) {
    peerIds.push(peerIdToAdd);
    url.searchParams.set('peers', peerIds.join(','));
  }

  return url.toString();
}

/**
 * Get peer IDs from a URL's peers parameter
 * @param {string} urlString - The URL string to parse
 * @returns {string[]} - Array of peer IDs
 */
export function getPeerIdsFromURL(urlString) {
  const url = new URL(urlString);
  const existingPeers = url.searchParams.get('peers');

  if (!existingPeers) return [];

  return existingPeers
    .split(',')
    .map(id => id.trim())
    .filter(Boolean);
}

/**
 * Check if peer IDs in URL are actually connected to any known peers
 * @param {string[]} urlPeerIds - Peer IDs from URL
 * @param {string[]} connectedPeerIds - Currently connected peer IDs
 * @param {string} myPeerId - Current user's peer ID
 * @returns {string[]} - Array of stale peer IDs that should be removed
 */
export function findStalePeerIds(urlPeerIds, connectedPeerIds, myPeerId) {
  return urlPeerIds.filter(
    peerId => peerId !== myPeerId && !connectedPeerIds.includes(peerId)
  );
} 