const { MongoClient } = require('mongodb')
require('dotenv').config()

const uri = process.env.MONGODBURI


const connectDB = async () => {
    const client = new MongoClient( uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    try {
        await client.connect()
        //list database
        await listDatabases(client)
        console.log('connect successfully to the server')
    } catch (error) {
        console.log(error)
    } finally {
        //ensure that client will close
        await client.close()
    }
}
const listDatabases = async(client) => {
    const databaseList = await client.db().admin().listDatabases()
    databaseList.databases.forEach((database) => {
        console.log(`${database.name}`)
    })
}
module.exports={ connectDB, listDatabases }
