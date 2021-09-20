const express = require ('express')
const bodyParser = require('body-parser')
const router = require('*/routes/v1/index')
const cors =require('cors')

const { connectDB } = require('*/config/mongodb')
const { json } = require('express')
require('dotenv').config()

const port = process.env.PORT || 3001

connectDB()
    .then(() => console.log('connected to DB'))
    .then(() => bootServer())
    .catch(error => {
        console.error(error)
        process.exit()
    })

const bootServer = () => {
    const app = express()
    const WHITELIST_DOMAINS = ['http://localhost:3000', 'https://trello-huy-2210.web.app']
    const corsOptions = {
        origin: function (origin, callback) {
            if (WHITELIST_DOMAINS.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        optionsSuccessStatus: 200
    }
    app.use(cors(corsOptions))
    // parse application/json
    app.use(bodyParser.json())

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(router)
    app.listen(port, () => {
        console.log(`server is running on port ${port}`)
    })
}

