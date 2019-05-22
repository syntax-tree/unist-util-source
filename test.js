'use strict'

var test = require('tape')
var remark = require('remark')
var source = require('.')

test('unist-util-source', function(t) {
  t.plan(10)

  remark()
    .use(function() {
      return transformer
      function transformer(tree, file) {
        var node = tree

        t.equal(source(node, file), '> + **[Hello](./example)**\n> world.')

        // Blockquote.
        node = tree.children[0]
        t.equal(source(node, file), '> + **[Hello](./example)**\n> world.')

        // List.
        node = node.children[0]
        t.equal(source(node, file), '+ **[Hello](./example)**\nworld.')

        // List-item.
        node = node.children[0]
        t.equal(source(node, file), '+ **[Hello](./example)**\nworld.')

        // Paragraph.
        node = node.children[0]
        t.equal(source(node, file), '**[Hello](./example)**\nworld.')

        // Strong.
        node = node.children[0]
        t.equal(source(node, file), '**[Hello](./example)**')

        // Link.
        node = node.children[0]
        t.equal(source(node, file), '[Hello](./example)')

        // Text.
        node = node.children[0]
        t.equal(source(node, file), 'Hello')

        // Generated.
        t.equal(source({type: node.type, value: node.value}, file), null)

        // Missing.
        t.equal(source(null, file), null)
      }
    })
    .processSync(['> + **[Hello](./example)**', '> world.'].join('\n'))
})
