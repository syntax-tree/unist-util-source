/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Position} Position
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('vfile').VFileValue} VFileValue
 */

import {location} from 'vfile-location'

const search = /\r?\n|\r/g

/**
 * Get the source of a node or at a position.
 *
 * @param {Node|Position} value
 *   Value to get.
 * @param {VFile|VFileValue} file
 *   File in which `value` exists.
 * @returns {string|null}
 *   Source of a node.
 */
export function source(value, file) {
  const doc = String(file)
  const loc = location(file)
  /** @type {import('unist').Position} */
  // @ts-expect-error Looks like a node.
  const position = (value && value.position) || value || {}
  const endOffset = loc.toOffset(position.end)
  let startOffset = loc.toOffset(position.start)

  if (endOffset === -1 || startOffset === -1) {
    return null
  }

  /** @type {Array.<string>} */
  const results = []

  while (startOffset < endOffset) {
    search.lastIndex = startOffset
    const match = search.exec(doc)
    const end = match && match.index < endOffset ? match.index : endOffset
    results.push(doc.slice(startOffset, end))
    startOffset = end

    if (match && match.index < endOffset) {
      startOffset += match[0].length
      results.push(match[0])
    }
  }

  return results.join('')
}
