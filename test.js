'use strict'

var test = require('tape')
var vfile = require('vfile')
var remark = require('remark')
var source = require('.')

test('unist-util-source', function (t) {
  var file = vfile('> + **[Hello](./example)**\n> world.')
  var node = remark().parse(file)

  t.equal(source(node, file), '> + **[Hello](./example)**\n> world.', 'root')

  node = node.children[0]
  t.equal(
    source(node, file),
    '> + **[Hello](./example)**\n> world.',
    'block quote'
  )

  node = node.children[0]
  t.equal(source(node, file), '+ **[Hello](./example)**\n> world.', 'list')

  node = node.children[0]
  t.equal(source(node, file), '+ **[Hello](./example)**\n> world.', 'list item')

  node = node.children[0]
  t.equal(source(node, file), '**[Hello](./example)**\n> world.', 'paragraph')

  node = node.children[0]
  t.equal(source(node, file), '**[Hello](./example)**', 'strong')

  node = node.children[0]
  t.equal(source(node, file), '[Hello](./example)', 'link')

  node = node.children[0]
  t.equal(source(node, file), 'Hello', 'text')

  t.equal(source({type: node.type, value: node.value}, file), null, 'generated')

  t.equal(source(null, file), null, 'missing')

  file = vfile('a\r\nb')
  node = remark().parse(file).children[0]

  t.equal(source(node, file), 'a\r\nb', 'cr + lf')

  file = vfile('a\rb')
  node = remark().parse(file).children[0]

  t.equal(source(node, file), 'a\rb', 'cr')

  file = vfile('a\n')
  node = remark().parse(file)

  t.equal(source(node, file), 'a\n', 'eof eol')

  file = vfile('a\n\rb')
  node = remark().parse(file)

  t.equal(source(node, file), 'a\n\rb', 'blank lines')

  t.end()
})
