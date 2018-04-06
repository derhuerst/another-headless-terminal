# another-headless-terminal

**A headless terminal emulator, based on [xterm.js](https://github.com/xtermjs/xterm.js).**

**Unfinished.** Waiting on [xtermjs/xterm.js#595](https://github.com/xtermjs/xterm.js/issues/595).

[![npm version](https://img.shields.io/npm/v/another-headless-terminal.svg)](https://www.npmjs.com/package/another-headless-terminal)
[![build status](https://api.travis-ci.org/derhuerst/another-headless-terminal.svg?branch=master)](https://travis-ci.org/derhuerst/another-headless-terminal)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/another-headless-terminal.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installing

```shell
npm install another-headless-terminal
```


## Usage

```js
const createTerminal = require('another-headless-terminal')

const term = createTerminal()
process.stdin.pipe(term)

// later
term.getScreen()
```


## Contributing

If you have a question or have difficulties using `another-headless-terminal`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/another-headless-terminal/issues).
