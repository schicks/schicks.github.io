import { describe, it, expect } from 'vitest';
import {
  removePeerIdsFromURL,
  addPeerIdToURL,
  getPeerIdsFromURL,
  findStalePeerIds
} from './url-utils.js';

describe('URL Utils', () => {
  const baseUrl = 'http://localhost:5173/demos/lazymesh';

  describe('removePeerIdsFromURL', () => {
    it('removes specified peer IDs from URL', () => {
      const url = `${baseUrl}?peers=peer1,peer2,peer3`;
      const result = removePeerIdsFromURL(['peer2'], url);
      expect(result).toBe(`${baseUrl}?peers=peer1%2Cpeer3`);
    });

    it('removes multiple peer IDs from URL', () => {
      const url = `${baseUrl}?peers=peer1,peer2,peer3,peer4`;
      const result = removePeerIdsFromURL(['peer2', 'peer4'], url);
      expect(result).toBe(`${baseUrl}?peers=peer1%2Cpeer3`);
    });

    it('removes all peer IDs and deletes peers parameter', () => {
      const url = `${baseUrl}?peers=peer1,peer2&other=value`;
      const result = removePeerIdsFromURL(['peer1', 'peer2'], url);
      expect(result).toBe(`${baseUrl}?other=value`);
    });

    it('handles URLs with no peers parameter', () => {
      const url = `${baseUrl}?other=value`;
      const result = removePeerIdsFromURL(['peer1'], url);
      expect(result).toBe(url);
    });

    it('handles empty peers parameter', () => {
      const url = `${baseUrl}?peers=`;
      const result = removePeerIdsFromURL(['peer1'], url);
      expect(result).toBe(`${baseUrl}?peers=`);
    });

    it('handles peers with whitespace', () => {
      const url = `${baseUrl}?peers= peer1 , peer2 , peer3 `;
      const result = removePeerIdsFromURL(['peer2'], url);
      expect(result).toBe(`${baseUrl}?peers=peer1%2Cpeer3`);
    });

    it('handles non-existent peer IDs gracefully', () => {
      const url = `${baseUrl}?peers=peer1,peer2`;
      const result = removePeerIdsFromURL(['peer3', 'peer4'], url);
      expect(result).toBe(`${baseUrl}?peers=peer1%2Cpeer2`);
    });

    it('preserves other URL parameters', () => {
      const url = `${baseUrl}?peers=peer1,peer2&mode=demo&test=true`;
      const result = removePeerIdsFromURL(['peer1'], url);
      expect(result).toBe(`${baseUrl}?peers=peer2&mode=demo&test=true`);
    });
  });

  describe('addPeerIdToURL', () => {
    it('adds a new peer ID to empty peers parameter', () => {
      const url = baseUrl;
      const result = addPeerIdToURL('newPeer', url);
      expect(result).toBe(`${baseUrl}?peers=newPeer`);
    });

    it('adds a new peer ID to existing peers', () => {
      const url = `${baseUrl}?peers=peer1,peer2`;
      const result = addPeerIdToURL('newPeer', url);
      expect(result).toBe(`${baseUrl}?peers=peer1%2Cpeer2%2CnewPeer`);
    });

    it('does not add duplicate peer ID', () => {
      const url = `${baseUrl}?peers=peer1,peer2`;
      const result = addPeerIdToURL('peer1', url);
      expect(result).toBe(`${baseUrl}?peers=peer1%2Cpeer2`);
    });

    it('preserves other URL parameters', () => {
      const url = `${baseUrl}?peers=peer1&mode=demo`;
      const result = addPeerIdToURL('newPeer', url);
      expect(result).toBe(`${baseUrl}?peers=peer1%2CnewPeer&mode=demo`);
    });
  });

  describe('getPeerIdsFromURL', () => {
    it('extracts peer IDs from URL', () => {
      const url = `${baseUrl}?peers=peer1,peer2,peer3`;
      const result = getPeerIdsFromURL(url);
      expect(result).toEqual(['peer1', 'peer2', 'peer3']);
    });

    it('returns empty array for URL with no peers parameter', () => {
      const url = baseUrl;
      const result = getPeerIdsFromURL(url);
      expect(result).toEqual([]);
    });

    it('returns empty array for empty peers parameter', () => {
      const url = `${baseUrl}?peers=`;
      const result = getPeerIdsFromURL(url);
      expect(result).toEqual([]);
    });

    it('handles peers with whitespace', () => {
      const url = `${baseUrl}?peers= peer1 , peer2 , peer3 `;
      const result = getPeerIdsFromURL(url);
      expect(result).toEqual(['peer1', 'peer2', 'peer3']);
    });

    it('filters out empty peer IDs', () => {
      const url = `${baseUrl}?peers=peer1,,peer2,`;
      const result = getPeerIdsFromURL(url);
      expect(result).toEqual(['peer1', 'peer2']);
    });
  });

  describe('findStalePeerIds', () => {
    const myPeerId = 'myPeer';
    const connectedPeers = ['peer1', 'peer3'];

    it('identifies stale peer IDs', () => {
      const urlPeerIds = ['peer1', 'peer2', 'peer3', 'peer4'];
      const result = findStalePeerIds(urlPeerIds, connectedPeers, myPeerId);
      expect(result).toEqual(['peer2', 'peer4']);
    });

    it('excludes own peer ID from stale list', () => {
      const urlPeerIds = ['myPeer', 'peer1', 'peer2'];
      const result = findStalePeerIds(urlPeerIds, connectedPeers, myPeerId);
      expect(result).toEqual(['peer2']);
    });

    it('returns empty array when all peers are connected', () => {
      const urlPeerIds = ['myPeer', 'peer1', 'peer3'];
      const result = findStalePeerIds(urlPeerIds, connectedPeers, myPeerId);
      expect(result).toEqual([]);
    });

    it('handles empty URL peer IDs', () => {
      const urlPeerIds = /** @type {string[]} */ ([]);
      const result = findStalePeerIds(urlPeerIds, connectedPeers, myPeerId);
      expect(result).toEqual([]);
    });

    it('handles empty connected peers', () => {
      const urlPeerIds = ['peer1', 'peer2'];
      const result = findStalePeerIds(urlPeerIds, [], myPeerId);
      expect(result).toEqual(['peer1', 'peer2']);
    });
  });
}); 