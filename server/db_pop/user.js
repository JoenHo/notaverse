db = db.getSiblingDB('notaverse');
// drop current collections
db.users.drop();
db.notes.drop();

// create user, notes collection
db.createCollection("users")
db.createCollection("notes")

// get userCollection, noteCollection
userCollection = db.getCollection("users");
noteCollection = db.getCollection("notes");

// JSON data for user
data = [
    {
        username: 'adam_anderson',
        email: 'adom.a@example.com',
        plan: 'Premium'
    },
    {
        username: 'john_smith1',
        email: 'john.smith@example.com',
        plan: 'Free'
    },
    {
        username: 'michael_jackson1',
        email: 'michael.jackson@example.com',
        plan: 'Premium'
        },
    {
        username: 'emma_watson1',
        email: 'emma.watson@example.com',
        plan: 'Free'
        },
    {
        username: 'david_johnson1',
        email: 'david.johnson@example.com',
        plan: 'Premium'
        },
    {
        username: 'amandawilson6',
        email: 'amandawilson6@example.com',
        password: 'MyP@ssw0rd',
        plan: 'Premium'
        },
];

// insert data to userCollection
userCollection.insertMany(data);


// Create notes and add them to Adam
let adam = userCollection.findOne({username:'adam_anderson'});
let user_id = adam._id;

// Json data for note
noteData = 
  {
    "user_id": user_id,
    "title": "A Cozy Reading Nook",
    "img_url": "https://example.com/readingnook.jpg",
    "content": "A comfortable chair, warm blanket, and a good book create the ideal reading nook."
  }

// Insert to noteCollection
noteCollection.insertOne(noteData);

// Retrieve the notes that match the provided user ID.
let note = noteCollection.findOne({user_id:user_id});

// Create a notes field for the user
db.users.updateOne(
  { "_id": user_id },
  { "$set": { "notes": [] } },
);

// Add the id of note to notes field of Adam
db.users.updateOne(
  { "_id": user_id},
  {"$push": { "notes": note._id} }
);
