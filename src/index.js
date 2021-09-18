const express = require ('express')
const app = express()
const { connectDB } = require('*/config/mongodb')
require('dotenv').config()

connectDB()

const port = process.env.PORT || 3000

app.get ('/', (req, res) => {
    res.send('<h1>hello world</h1>')
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
