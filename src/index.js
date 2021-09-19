const express = require ('express')
const bodyParser = require('body-parser')
const router = require('*/routes/v1/index')

const { connectDB } = require('*/config/mongodb')
const { json } = require('express')
require('dotenv').config()

const port = process.env.PORT || 3000

connectDB()
    .then(() => console.log('connected to DB'))
    .then(() => bootServer())
    .catch(error => {
        console.error(error)
        process.exit()
    })

const bootServer = () => {
    const app = express()
    
    // parse application/json
    app.use(bodyParser.json())

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(router)
    app.listen(port, () => {
        console.log(`server is running on port ${port}`)
    })
}

