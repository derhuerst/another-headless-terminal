'use strict'

const fs = require('fs')
const path = require('path')

const createTerminal = require('.')

const inputFile = 't0504-vim.in'
// const inputFile = 't0004-LF.in'
const input = fs.readFileSync(path.join(__dirname, 'fixtures', inputFile))

const terminal = createTerminal()
terminal.end(input)

console.error(terminal.getScreen())
