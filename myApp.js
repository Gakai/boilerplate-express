const { join } = require('node:path')
const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()

const app = express()

console.log('Hello World')

// Request Logger
app.use((req, res, next) => {
	console.log(req.method, req.path, '-', req.ip)
	return next()
})
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/public', express.static(join(__dirname, 'public')))

app.get('/', (req, res) => {
	const indexFile = join(__dirname, 'views', 'index.html')
	res.sendFile(indexFile)
})

app.get('/:word/echo', (req, res) => {
	res.json({ echo: req.params.word })
})

app
	.route('/name')
	.get((req, res) => {
		res.json({
			name: `${req.query.first} ${req.query.last}`,
		})
	})
	.post((req, res) => {
		res.json({
			name: `${req.body.first} ${req.body.last}`,
		})
	})

app.get(
	'/now',
	(req, res, next) => {
		req.time = new Date().toString()
		return next()
	},
	(req, res) => {
		return res.json({ time: req.time })
	}
)

app.get('/json', (req, res) => {
	let message = 'Hello json'
	if (process.env.MESSAGE_STYLE === 'uppercase') message = message.toUpperCase()
	res.json({ message })
})

module.exports = app
