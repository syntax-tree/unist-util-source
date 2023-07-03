import assert from 'node:assert/strict'
import test from 'node:test'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {source} from 'unist-util-source'
import {VFile} from 'vfile'

test('source', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('unist-util-source')).sort(), [
      'source'
    ])
  })

  const file = new VFile('> + **[Hello](./example)**\n> world.')
  const tree = fromMarkdown(String(file))
  const blockquote = tree.children[0]
  assert(blockquote.type === 'blockquote')
  const list = blockquote.children[0]
  assert(list.type === 'list')
  const listItem = list.children[0]
  const paragraph = listItem.children[0]
  assert(paragraph.type === 'paragraph')
  const strong = paragraph.children[0]
  assert(strong.type === 'strong')
  const link = strong.children[0]
  assert(link.type === 'link')
  const text = link.children[0]
  assert(text.type === 'text')

  await t.test('should support a root', async function () {
    assert.equal(source(file, tree), '> + **[Hello](./example)**\n> world.')
  })

  await t.test('should support a block quote', async function () {
    assert.equal(
      source(file, blockquote),
      '> + **[Hello](./example)**\n> world.'
    )
  })

  await t.test('should support a list', async function () {
    assert.equal(source(file, list), '+ **[Hello](./example)**\n> world.')
  })

  await t.test('should support a list item', async function () {
    assert.equal(source(file, listItem), '+ **[Hello](./example)**\n> world.')
  })

  await t.test('should support a paragraph', async function () {
    assert.equal(source(file, paragraph), '**[Hello](./example)**\n> world.')
  })

  await t.test('should support strong', async function () {
    assert.equal(source(file, strong), '**[Hello](./example)**')
  })

  await t.test('should support a link', async function () {
    assert.equal(source(file, link), '[Hello](./example)')
  })

  await t.test('should support a text', async function () {
    assert.equal(source(file, text), 'Hello')
  })

  await t.test('should support a position', async function () {
    assert.equal(source(file, text.position), 'Hello')
  })

  await t.test('should support out of bounds data', async function () {
    const text = {
      type: 'text',
      value: 'qwe',
      position: {start: {line: 0, column: 0}, end: {line: 0, column: 0}}
    }
    assert.equal(source(file, text), undefined)
  })

  await t.test('should support a generated node', async function () {
    const text = {type: 'text', value: 'qwe'}
    assert.equal(source(file, text), undefined)
  })

  await t.test('should support a nullish node', async function () {
    assert.equal(source(file, null), undefined)
  })

  await t.test('should support cr + lf', async function () {
    const file = new VFile('a\r\nb')
    const node = fromMarkdown(String(file))
    const paragraph = node.children[0]
    assert.equal(source(file, paragraph), 'a\r\nb')
  })

  await t.test('should support cr', async function () {
    const file = new VFile('a\rb')
    const node = fromMarkdown(String(file))
    const paragraph = node.children[0]

    assert.equal(source(file, paragraph), 'a\rb')
  })

  await t.test('should support an eof eol', async function () {
    const file = new VFile('a\n')
    const node = fromMarkdown(String(file))

    assert.equal(source(file, node), 'a\n')
  })

  await t.test('should support an lf + cr (a blank line)', async function () {
    const file = new VFile('a\n\rb')
    const node = fromMarkdown(String(file))

    assert.equal(source(file, node), 'a\n\rb')
  })
})
