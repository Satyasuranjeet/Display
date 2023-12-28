const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

const url = 'mongodb+srv://satya:Satya12345@cluster0.8thgg4a.mongodb.net/?retryWrites=true&w=majority'; // replace with your MongoDB connection string
const dbName = 'Demo'; // replace with your database name
const collectionName = 'Data'; // replace with your collection name

app.use(cors()); // Enable CORS for all routes

app.get('/data', async (req, res) => {
  let client; // declare the client variable outside the try-catch block

  try {
    client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = await collection.find().toArray();

    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    if (client) {
      client.close();
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
