
const { MongoClient } = require('mongodb')
const ObjectId = require('mongodb').ObjectId

// Replace the uri string with your MongoDB deployment's connection string.
const uri = 'mongodb+srv://test:68IYbQdyBoAspBwq@cluster0.b8pyd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const client = new MongoClient(uri)

async function run () {
  try {
    await client.connect()

    const database = client.db('kareem')
    const login = database.collection('login')

    // Query for a movie that has the title 'Back to the Future'
    const query = { _id: ObjectId('622fae0c0393cca40484b708') }
    const credentials = await login.findOne(query)

    return credentials
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

module.exports = run
