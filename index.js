'use strict'

const {JSDOM} = require('jsdom')
const matchMediaPolyfill = require('mq-polyfill').default
const {Writable} = require('stream')

const dom = new JSDOM()
matchMediaPolyfill(dom.window)
global.window = dom.window
global.window.requestAnimationFrame = (cb) => setTimeout(cb, 0)
global.document = dom.window.document

const {Terminal} = require('xterm')
const {CHAR_DATA_CHAR_INDEX} = require('xterm/lib/Buffer')

const defaults = {
	width: 80,
	height: 30,
	tabWidth: 8
}

const createHeadlessTerminal = (opt = {}) => {
	opt = Object.assign({}, defaults, opt)

	const term = new Terminal({
		cols: opt.width,
		rows: opt.height,
		tabStopWidth: opt.tabWidth
	})

	term.refresh = (start, end, queue) => {
		term.screen.render()
	}
	term.keyDown = () => {}
	term.keyPress = () => {}

	const container = document.createElement('div')
	Object.defineProperty(document, 'ownerDocument', {value: document})
	document.body.appendChild(container)
	term.open(container, true)

	const write = (chunk, enc, cb) => {
		if (Buffer.isBuffer(chunk)) chunk = chunk.toString()
		const state = term.parser.parse(chunk)
		term.parser.setState(state)
		term.updateRange(term.buffer.y)
		term.refresh(term.refreshStart, term.refreshEnd)
		cb()
	}

	const getScreen = () => {
		// todo: use ndarray
		const buf = term.buffer
		let str = '', lineStr
		for (let line = buf.ybase; line < (buf.ybase + term.rows); line++) {
			lineStr = ''
			for (let cell = 0; cell < term.cols; ++cell) {
				lineStr += buf.lines.get(line)[cell][CHAR_DATA_CHAR_INDEX]
			}
			// rtrim empty cells as xterm does
			lineStr = lineStr.replace(/\s+$/, '')
			str += lineStr
			str += '\n'
		}
		return str
	}

	const out = new Writable({write})
	out.getScreen = getScreen
	return out
}

module.exports = createHeadlessTerminal
