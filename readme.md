# unist-util-source

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

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
var vfile = require('to-vfile')
var unified = require('unified')
var parse = require('remark-parse')
var source = require('unist-util-source')

var file = vfile.readSync('example.md')
var tree = unified()
  .use(parse)
  .parse(file)

var list = tree.children[0].children[0]
console.log(source(list, file))
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

See [`contributing.md` in `syntax-tree/unist`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/unist-util-source.svg

[build]: https://travis-ci.org/syntax-tree/unist-util-source

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/unist-util-source.svg

[coverage]: https://codecov.io/github/syntax-tree/unist-util-source

[downloads-badge]: https://img.shields.io/npm/dm/unist-util-source.svg

[downloads]: https://www.npmjs.com/package/unist-util-source

[size-badge]: https://img.shields.io/bundlephobia/minzip/unist-util-source.svg

[size]: https://bundlephobia.com/result?p=unist-util-source

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/syntax-tree

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[unist]: https://github.com/syntax-tree/unist

[node]: https://github.com/syntax-tree/unist#node

[position]: https://github.com/syntax-tree/unist#position

[vfile]: https://github.com/vfile/vfile

[contributing]: https://github.com/syntax-tree/unist/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/unist/blob/master/code-of-conduct.md
