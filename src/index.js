const express = require ('express')
const BoardModel = require ('*/models/board.model')

const { connectDB } = require('*/config/mongodb')
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
    app.get ('/test', async(req, res) => {
        let fakeData = {
            title: 'title1'
        }
        await BoardModel.createNew(fakeData)
        res.send('<h1>hello world</h1>')
    })
    app.listen(port, () => {
        console.log(`server is running on port ${port}`)
    })
}

