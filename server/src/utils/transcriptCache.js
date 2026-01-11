// Simple in-memory cache
const cache = {};

/**
 * Get transcript from cache
 * @param {string} videoId
 * @returns {string|null} transcript if exists
 */
export function getCachedTranscript(videoId) {
  return cache[videoId] || null;
}

/**
 * Save transcript to cache
 * @param {string} videoId
 * @param {string} transcript
 */
export function setCachedTranscript(videoId, transcript) {
  cache[videoId] = transcript;
}
