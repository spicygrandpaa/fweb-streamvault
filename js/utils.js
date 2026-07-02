/* ═══════════════════════════════════════════════════════════
   js/utils.js — Shared Utility Functions
   Small, pure helpers used across the application.
   No side effects. No DOM manipulation. Just logic.
═══════════════════════════════════════════════════════════ */

const Utils = {

  /**
   * Waits for a given number of milliseconds.
   * Usage: await Utils.sleep(500);
   * @param {number} ms
   * @returns {Promise<void>}
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * Normalizes a string for comparison: lowercase, trimmed, no punctuation.
   * Used to compare the secret answer leniently.
   * @param {string} str
   * @returns {string}
   */
  normalize(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]/g, '')  // Strip punctuation
      .replace(/\s+/g, ' ');         // Collapse whitespace
  },

  /**
   * Checks if an answer matches the configured correct answer.
   * Case-insensitive and punctuation-agnostic.
   * @param {string} input
   * @param {string} correct
   * @returns {boolean}
   */
  isCorrectAnswer(input, correct) {
    return Utils.normalize(input) === Utils.normalize(correct);
  },

  /**
   * Clamps a number between min and max.
   * @param {number} value
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  },

  /**
   * Gets a CSS custom property value from :root.
   * @param {string} property — e.g. '--duration-slow'
   * @returns {string}
   */
  getCSSVar(property) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(property)
      .trim();
  },

  /**
   * Parses a CSS duration string ('400ms', '1.2s') into milliseconds.
   * @param {string} cssValue
   * @returns {number}
   */
  parseDuration(cssValue) {
    if (!cssValue) return 0;
    if (cssValue.includes('ms')) return parseFloat(cssValue);
    if (cssValue.includes('s'))  return parseFloat(cssValue) * 1000;
    return 0;
  },

  /**
   * Gets a CSS duration variable in milliseconds.
   * @param {string} varName — e.g. '--duration-cinematic'
   * @returns {number}
   */
  getDuration(varName) {
    return Utils.parseDuration(Utils.getCSSVar(varName));
  },

  /**
   * Checks if the user prefers reduced motion.
   * @returns {boolean}
   */
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

};
