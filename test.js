import test from 'tape'
import remark from 'remark'
import {VFile} from 'vfile'
import {source} from './index.js'

test('unist-util-source', function (t) {
  var file = new VFile('> + **[Hello](./example)**\n> world.')
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

  file = new VFile('a\r\nb')
  node = remark().parse(file).children[0]

  t.equal(source(node, file), 'a\r\nb', 'cr + lf')

  file = new VFile('a\rb')
  node = remark().parse(file).children[0]

  t.equal(source(node, file), 'a\rb', 'cr')

  file = new VFile('a\n')
  node = remark().parse(file)

  t.equal(source(node, file), 'a\n', 'eof eol')

  file = new VFile('a\n\rb')
  node = remark().parse(file)

  t.equal(source(node, file), 'a\n\rb', 'blank lines')

  t.end()
})
