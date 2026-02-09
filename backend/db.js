const { MongoClient } = require('mongodb');

// It's best to use environment variables for the connection string.
// If you use 'dotenv', this will be: process.env.MONGODB_URI
// For now, you can replace the string below with your Atlas link.
const uri = process.env.MONGODB_URI;

let client;
let db;

async function connectToDatabase() {
    if (db) return db;

    try {
        console.log("Connecting to MongoDB Atlas...");
        client = new MongoClient(uri);
        await client.connect();
        console.log("Successfully connected to MongoDB Atlas");

        // Use the database name from .env or default to 'pyqlibrary'
        const dbName = process.env.DB_NAME || 'pyqlibrary';
        db = client.db(dbName);
        console.log(`Connected to database: ${dbName}`);
        return db;
    } catch (error) {
        console.error("Failed to connect to MongoDB Atlas:", error);
        throw error;
    }
}

function getDb() {
    if (!db) {
        throw new Error("Database not initialized. Call connectToDatabase first.");
    }
    return db;
}

module.exports = { connectToDatabase, getDb };

