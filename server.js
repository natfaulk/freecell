require('dotenv').config()

const express = require('express')
const path = require('path')
const lg = require('@natfaulk/supersimplelogger')('Server')

const app = express()
const port = process.env.PORT || 3000

app.use('/static', express.static('www'))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'www', 'index.html'))
})

app.listen(port, () => {
  lg(`Example app listening at http://localhost:${port}`)
})
