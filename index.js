'use strict'

var location = require('vfile-location')

module.exports = source

var search = /\r?\n|\r/g

function source(value, file) {
  var doc = String(file)
  var loc = location(file)
  var position = (value && value.position) || value || {}
  var startOffset = loc.toOffset(position.start)
  var endOffset = loc.toOffset(position.end)
  var results = []
  var match
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
