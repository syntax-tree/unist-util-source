# unist-util-source [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[**Unist**][unist] utility to get the source of a [Node][] or
[Location][].

## Installation

[npm][]:

```bash
npm install unist-util-source
```

## Usage

Say we have the following file, `example.md`:

```markdown
> + **[Hello](./example)**
>   world.
```

And our script, `example.js`, looks as follows:

```javascript
var vfile = require('to-vfile');
var unified = require('unified');
var parse = require('remark-parse');
var source = require('unist-util-source');

var file = vfile.readSync('example.md');
var tree = unified().use(parse).parse(file);

var list = tree.children[0].children[0];
console.log(source(list, file));
```

Now, running `node example` yields:

```markdown
+ **[Hello](./example)**
  world.
```

## API

### `source(value, doc)`

###### Parameters

*   `value` ([`Node`][node] or [`Location`][location]) — Value to get
*   `doc` ([`VFile`][vfile] or `string`) — Document in which `value` exists

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
