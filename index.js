'use strict'

var location = require('vfile-location')

module.exports = source

function source(value, file) {
  var doc = String(file)
  var loc = location(file)
  var position = (value && value.position) || value || {}
  var start
  var end
  var indents
  var indent
  var lines
  var length
  var index

  start = loc.toOffset(position.start)
  end = loc.toOffset(position.end)
  indents = position.indent || []

  if (start === -1 || end === -1) {
    return null
  }

  lines = doc.slice(start, end).split('\n')
  length = lines.length
  index = 0

  while (++index < length) {
    indent = indents[index - 1]
    lines[index] = lines[index].slice(indent ? indent - 1 : 0)
  }

  return lines.join('\n')
}
