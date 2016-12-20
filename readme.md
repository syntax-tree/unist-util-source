# unist-util-source [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[**Unist**][unist] utility to get the source of a [Node][] or
[Location][].

## Installation

[npm][]:

```bash
npm install unist-util-source
```

## Usage

```js
var remark = require('remark');
var source = require('./');

remark()
  .use(function () {
    return transformer;
    function transformer(tree, file) {
      var list = tree.children[0].children[0];
      console.log(source(list, file));
    }
  })
  .process('> + **[Hello](./example)**\n> world.');
```

Yields:

```txt
+ **[Hello](./example)**
world.
```

## API

### `source(value, doc)`

###### Parameters

*   `value` ([`Node`][node] or [`Location`][location]) — Value to get.
*   `doc` ([`VFile`][vfile] or `string`) — Document in which `value`
    exists.

###### Returns

`string?` — Source of `value` in `file`, if available.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/syntax-tree/unist-util-source.svg

[travis]: https://travis-ci.org/syntax-tree/unist-util-source

[codecov-badge]: https://img.shields.io/codecov/c/github/syntax-tree/unist-util-source.svg

[codecov]: https://codecov.io/github/syntax-tree/unist-util-source

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[unist]: https://github.com/syntax-tree/unist

[node]: https://github.com/syntax-tree/unist#node

[location]: https://github.com/syntax-tree/unist#location

[vfile]: https://github.com/vfile/vfile
