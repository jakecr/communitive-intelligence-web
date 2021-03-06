require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
require('./db/mongoose')
const conversationRouter = require('./routers/conversation')
const cors = require('cors')
const path = require('path')
const publicPath = path.join(__dirname, '..', 'public')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.use(conversationRouter)

app.use(express.static(publicPath))

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`)
})