let { join } = require('node:path')
let express = require('express')
let app = express()

console.log('Hello World')

app.get('/', (req, res) => {
	const indexFile = join(__dirname, 'views', 'index.html')
	res.sendFile(indexFile)
})

module.exports = app
