let { join } = require('node:path')
require('dotenv').config()
let express = require('express')
let app = express()

console.log('Hello World')

app.use('/public', express.static(join(__dirname, 'public')))

app.get('/', (req, res) => {
	const indexFile = join(__dirname, 'views', 'index.html')
	res.sendFile(indexFile)
})

app.get('/json', (req, res) => {
	let message = 'Hello json'
	if (process.env.MESSAGE_STYLE === 'uppercase') message = message.toUpperCase()
	res.json({ message })
})

module.exports = app
