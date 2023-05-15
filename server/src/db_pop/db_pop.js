const fs = require('fs');

db = db.getSiblingDB('notaverse');

// drop current collections
db.users.drop();
db.notes.drop();
db.rooms.drop();
db.room_items.drop();
db.elements.drop();

// create user, notes collection
db.createCollection("users")
db.createCollection("notes")
db.createCollection("rooms")
db.createCollection("room_items")
db.createCollection("elements")

// get userCollection, noteCollection
userCollection = db.getCollection("users");
noteCollection = db.getCollection("notes");
roomCollection = db.getCollection("rooms");
roomItemCollection = db.getCollection("room_items");
elementCollection = db.getCollection("elements");

// JSON data
userData = JSON.parse(fs.readFileSync(__dirname + '/collection_data/users.json'));
noteData = JSON.parse(fs.readFileSync(__dirname + '/collection_data/notes.json'));
roomData = JSON.parse(fs.readFileSync(__dirname + '/collection_data/rooms.json'));
elementData = JSON.parse(fs.readFileSync(__dirname + '/collection_data/elements.json'));

// insert data to userCollection
userCollection.insertMany(userData);
noteCollection.insertMany(noteData);
roomCollection.insertMany(roomData);
elementCollection.insertMany(elementData);
