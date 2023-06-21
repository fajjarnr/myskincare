const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DATABASE_URL; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

let db; // Global variable to store the database connection

async function connect() {
  try {
    await client.connect();
    db = client.db('airbnb'); // Replace with your database name
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

function getDB() {
  return db;
}

module.exports = {
  connect,
  getDB,
};
