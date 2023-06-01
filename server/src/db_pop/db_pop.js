const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri =
  'mongodb+srv://notaverse_admin:5SORp7DVWRt9VDZv@cluster0.wxbgpj2.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function populateData() {
  try {
    await client.connect();

    const db = client.db('test');

    // drop current collections
    await db.collection('users').drop();
    await db.collection('notes').drop();
    await db.collection('rooms').drop();
    await db.collection('room_items').drop();
    await db.collection('elements').drop();

    // create collections
    await db.createCollection('users');
    await db.createCollection('notes');
    await db.createCollection('rooms');
    await db.createCollection('room_items');
    await db.createCollection('elements');

    // get collection references
    const userCollection = db.collection('users');
    const noteCollection = db.collection('notes');
    const roomCollection = db.collection('rooms');
    const roomItemCollection = db.collection('room_items');
    const elementCollection = db.collection('elements');

    // JSON data
    const userData = JSON.parse(
      fs.readFileSync(__dirname + '/collection_data/users.json')
    );
    const noteData = JSON.parse(
      fs.readFileSync(__dirname + '/collection_data/notes.json')
    );
    const roomData = JSON.parse(
      fs.readFileSync(__dirname + '/collection_data/rooms.json')
    );
    const elementData = JSON.parse(
      fs.readFileSync(__dirname + '/collection_data/elements.json')
    );

    // insert data
    await userCollection.insertMany(userData);
    await noteCollection.insertMany(noteData);
    await roomCollection.insertMany(roomData);
    await elementCollection.insertMany(elementData);

    console.log('Data populated successfully');
  } catch (error) {
    console.error('Error populating data:', error);
  } finally {
    await client.close();
  }
}

populateData();
