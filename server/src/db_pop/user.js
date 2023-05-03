db = db.getSiblingDB('notaverse');
db.createCollection("users")
userCollection = db.getCollection("users");
noteCollection = db.getCollection("notes");

data = [
    {
        username: 'adam_anderson',
        email: 'adom.a@example.com',
        password: 'J@ARGgre!2023',
        plan: 'Premium'
    },
    {
        username: 'john_smith1',
        email: 'john.smith@example.com',
        password: 'J0hn$eh#2023',
        plan: 'Free'
    },
    {
        username: 'michael_jackson1',
        email: 'michael.jackson@example.com',
        password: 'M1ch@elargaeJ@cks0n',
        plan: 'Premium'
        },
    {
        username: 'emma_watson1',
        email: 'emma.watson@example.com',
        password: 'wae@W@ts0n!2023',
        plan: 'Free'
        },
    {
        username: 'david_johnson1',
        email: 'david.johnson@example.com',
        password: 'D@gwefe$0n',
        plan: 'Premium'
        },
    {
        username: 'amandawilson6',
        email: 'amandawilson6@example.com',
        password: 'MyP@ssw0rd',
        plan: 'Premium'
        },
];
    
userCollection.insertMany(data);


let user = userCollection.findOne({username:'adam_anderson'});
let user_id = user._id;
noteData = [
  {
    "user": user_id,
    "title": "Note 100",
    "img_url": "https://example.com/forest.jpg",
    "content": "A peaceful walk through the forest offers a chance to reconnect with nature."
  },
  {
    "user": user_id,
    "title": "Note 200",
    "img_url": "https://example.com/forest.jpg",
    "content": "A peaceful walk through the forest offers a chance to reconnect with nature."
  }
] 

noteCollection.insertMany(noteData);