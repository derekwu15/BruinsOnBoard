const { MongoClient } = require('mongodb');

// Connection URI
const uri = '***REMOVED***';

// Create a new MongoClient
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        return client.db('BruinsOnBoard');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas', err);
        throw err;
    }
}

module.exports = connectToMongoDB;
