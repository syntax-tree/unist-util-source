# unist-util-source

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**unist**][unist] utility to get the source of a node or at a position.

## Install

[npm][]:

```sh
npm install unist-util-source
```

## Use

Say we have the following file, `example.md`:

```markdown
> + **[Hello](./example)**
>   world.
```

And our script, `example.js`, looks as follows:

```js
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
*   `doc` ([`VFile`][vfile] or `string`) — [file][] in which `value` exists

###### Returns

`string?` — Source of `value` in `doc`, if available.

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/syntax-tree/unist-util-source/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/unist-util-source/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/unist-util-source.svg

[coverage]: https://codecov.io/github/syntax-tree/unist-util-source

[downloads-badge]: https://img.shields.io/npm/dm/unist-util-source.svg

[downloads]: https://www.npmjs.com/package/unist-util-source

[size-badge]: https://img.shields.io/bundlephobia/minzip/unist-util-source.svg

[size]: https://bundlephobia.com/result?p=unist-util-source

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md

[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md

[unist]: https://github.com/syntax-tree/unist

[node]: https://github.com/syntax-tree/unist#node

[position]: https://github.com/syntax-tree/unist#position

[vfile]: https://github.com/vfile/vfile

[file]: https://github.com/syntax-tree/unist#file
