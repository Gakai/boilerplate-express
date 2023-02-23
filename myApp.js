let { join } = require('node:path')
let express = require('express')
let app = express()

console.log('Hello World')

app.use('/public', express.static(join(__dirname, 'public')))

app.get('/', (req, res) => {
	const indexFile = join(__dirname, 'views', 'index.html')
	res.sendFile(indexFile)
})

app.get('/json', (req, res) => {
	res.json({ message: 'Hello json' })
})

module.exports = app
