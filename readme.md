# unist-util-source [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[**Unist**][unist] utility to get the source of a [`Node`][node] or
[`Position`][position].

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

*   `value` ([`Node`][node] or [`Position`][position]) — Value to get
*   `doc` ([`VFile`][vfile] or `string`) — Document in which `value` exists

###### Returns

`string?` — Source of `value` in `file`, if available.

## Contribute

See [`contribute.md` in `syntax-tree/unist`][contribute] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

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

[position]: https://github.com/syntax-tree/unist#position

[vfile]: https://github.com/vfile/vfile

[contribute]: https://github.com/syntax-tree/unist/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/unist/blob/master/code-of-conduct.md
