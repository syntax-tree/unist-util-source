import {location} from 'vfile-location'

var search = /\r?\n|\r/g

/**
 * @param {import('unist').Node|import('unist').Position} value Value to get
 * @param {import('vfile').VFile|import('vfile').VFileValue} file File in which `value` exists
 * @returns {string|null}
 */
export function source(value, file) {
  var doc = String(file)
  var loc = location(file)
  /** @type {import('unist').Position} */
  // @ts-ignore Looks like a node.
  var position = (value && value.position) || value || {}
  var startOffset = loc.toOffset(position.start)
  var endOffset = loc.toOffset(position.end)
  /** @type {Array.<string>} */
  var results = []
  /** @type {RegExpMatchArray} */
  var match
  /** @type {number} */
  var end

  if (startOffset === -1 || endOffset === -1) {
    return null
  }

  while (startOffset < endOffset) {
    search.lastIndex = startOffset
    match = search.exec(doc)
    end = match && match.index < endOffset ? match.index : endOffset
    results.push(doc.slice(startOffset, end))
    startOffset = end

    if (match && match.index < endOffset) {
      startOffset += match[0].length
      results.push(match[0])
    }
  }

  return results.join('')
}
