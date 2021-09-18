const { MongoClient } = require('mongodb')
require('dotenv').config()

const uri = process.env.MONGODBURI
let dbInstance=null

const connectDB = async () => {
    const client = new MongoClient( uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    await client.connect()
    dbInstance = client.db(process.env.DB_NAME)
}

//get database instance

const getDB = () => {
    if (!dbInstance) throw new Error ('Must connect to DD first')
    return dbInstance
}

module.exports={ connectDB, getDB }
