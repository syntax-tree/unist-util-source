/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Text} Text
 * @typedef {Root['children'][number]|Root} Node
 */

import assert from 'node:assert'
import test from 'tape'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {VFile} from 'vfile'
import {source} from './index.js'

test('unist-util-source', (t) => {
  let file = new VFile('> + **[Hello](./example)**\n> world.')
  /** @type {Node} */
  let node = fromMarkdown(String(file))

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

  t.equal(source(node.position, file), 'Hello', 'position')

  t.equal(
    source(
      /** @type {Text} */ ({
        type: 'text',
        value: 'qwe',
        position: {start: {line: 0, column: 0}, end: {line: 0, column: 0}}
      }),
      file
    ),
    null,
    'out of bounds data'
  )

  t.equal(
    source(/** @type {Text} */ ({type: 'text', value: 'qwe'}), file),
    null,
    'generated'
  )

  t.equal(source(null, file), null, 'missing')

  file = new VFile('a\r\nb')
  node = fromMarkdown(String(file))
  assert(node.type === 'root')
  node = node.children[0]
  assert(node.type === 'paragraph')

  t.equal(source(node, file), 'a\r\nb', 'cr + lf')

  file = new VFile('a\rb')
  node = fromMarkdown(String(file))
  assert(node.type === 'root')
  node = node.children[0]
  assert(node.type === 'paragraph')

  t.equal(source(node, file), 'a\rb', 'cr')

  file = new VFile('a\n')
  node = fromMarkdown(String(file))

  t.equal(source(node, file), 'a\n', 'eof eol')

  file = new VFile('a\n\rb')
  node = fromMarkdown(String(file))

  t.equal(source(node, file), 'a\n\rb', 'blank lines')

  t.end()
})
