/**
 * @typedef {import('unist').Position} Position
 * @typedef {import('unist').Node} Node
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('vfile').VFileValue} VFileValue
 */

/**
 * @typedef NodeLike
 * @property {string} type
 * @property {PositionLike | null | undefined} [position]
 *
 * @typedef PositionLike
 * @property {PointLike | null | undefined} [start]
 * @property {PointLike | null | undefined} [end]
 *
 * @typedef PointLike
 * @property {number | null | undefined} [line]
 * @property {number | null | undefined} [column]
 * @property {number | null | undefined} [offset]
 */

import {location} from 'vfile-location'

/**
 * Get the source of a node or at a position.
 *
 * @param {VFile | VFileValue} file
 *   File in which `value` exists.
 * @param {Node | NodeLike | Position | PositionLike | null | undefined} value
 *   Value to get.
 * @returns {string | undefined}
 *   Source of `value` in `doc`, if available.
 */
export function source(file, value) {
  const doc = String(file)
  const loc = location(file)
  const position =
    value && typeof value === 'object'
      ? 'type' in value
        ? value.position
        : value
      : undefined

  if (!position) {
    return undefined
  }

  const endOffset = loc.toOffset(position.end)
  const startOffset = loc.toOffset(position.start)

  return endOffset === undefined || startOffset === undefined
    ? undefined
    : doc.slice(startOffset, endOffset)
}
