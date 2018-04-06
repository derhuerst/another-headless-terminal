'use strict'

const fs = require('fs')
const path = require('path')
const {inspect} = require('util')

const createTerminal = require('.')

const inputFile = 't0504-vim.in'
const input = fs.readFileSync(path.join(__dirname, 'fixtures', inputFile))

const terminal = createTerminal({height: 11})
terminal.end(input)

const expected = `\

          v    1
               2

3^



                                                                               v
...
   ooo^
`

assert.strictEqual(terminal.getScreen(), expected)
