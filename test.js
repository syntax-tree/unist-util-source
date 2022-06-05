/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Text} Text
 * @typedef {Root['children'][number]|Root} Node
 */

import assert from 'node:assert'
import test from 'tape'
import {remark} from 'remark'
import {VFile} from 'vfile'
import {source} from './index.js'

test('unist-util-source', (t) => {
  let file = new VFile('> + **[Hello](./example)**\n> world.')
  /** @type {Node} */
  let node = remark().parse(file)

  t.equal(source(node, file), '> + **[Hello](./example)**\n> world.', 'root')

  assert(node.type === 'root')
  node = node.children[0]
  assert(node.type === 'blockquote')
  t.equal(
    source(node, file),
    '> + **[Hello](./example)**\n> world.',
    'block quote'
  )

  node = node.children[0]
  assert(node.type === 'list')
  t.equal(source(node, file), '+ **[Hello](./example)**\n> world.', 'list')

  node = node.children[0]
  assert(node.type === 'listItem')
  t.equal(source(node, file), '+ **[Hello](./example)**\n> world.', 'list item')

  node = node.children[0]
  assert(node.type === 'paragraph')
  t.equal(source(node, file), '**[Hello](./example)**\n> world.', 'paragraph')

  node = node.children[0]
  assert(node.type === 'strong')
  t.equal(source(node, file), '**[Hello](./example)**', 'strong')

  node = node.children[0]
  assert(node.type === 'link')
  t.equal(source(node, file), '[Hello](./example)', 'link')

  node = node.children[0]
  assert(node.type === 'text')
  t.equal(source(node, file), 'Hello', 'text')

  t.equal(
    source(/** @type {Text} */ ({type: node.type, value: node.value}), file),
    null,
    'generated'
  )

  // @ts-expect-error: runtime.
  t.equal(source(null, file), null, 'missing')

  file = new VFile('a\r\nb')
  node = remark().parse(file)
  assert(node.type === 'root')
  node = node.children[0]
  assert(node.type === 'paragraph')

  t.equal(source(node, file), 'a\r\nb', 'cr + lf')

  file = new VFile('a\rb')
  node = remark().parse(file)
  assert(node.type === 'root')
  node = node.children[0]
  assert(node.type === 'paragraph')

  t.equal(source(node, file), 'a\rb', 'cr')

  file = new VFile('a\n')
  node = remark().parse(file)

  t.equal(source(node, file), 'a\n', 'eof eol')

  file = new VFile('a\n\rb')
  node = remark().parse(file)

  t.equal(source(node, file), 'a\n\rb', 'blank lines')

  t.end()
})
