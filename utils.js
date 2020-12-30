/**
 * Helper: Utils
 * ------------------------------------------------------------------------------
 * Tiny helper functions intended for strings etc.
 *
 * @namespace utils
 */

/**
 * Converts a string to use kebab case.
 * @param {string} string - The string to convert.
 * @returns {string}
 */
export function kebab(string) {
  return string.replace(
    /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g,
    (match, index) =>
      `${index > 0 ? `-` : ''}${match.toLowerCase()}`
  )
}
