const mongoose = require('mongoose');

/* Moved credentials to .env */

// const mongoUser = 'dbReadOnlyUser';
// const mongoPasswd = 'jelly1234';
// const mongoDBName = 'MERN-STARTER-DB';
// const mongoServer = 'cluster0.vvqav.mongodb.net';
// const url =
//   `mongodb+srv://${mongoUser}:${mongoPasswd}` +
//   `@${mongoServer}/${mongoDBName}?retryWrites=true&w=majority`;

// const localMongoUrl = "mongodb://localhost:27017/Civitas"

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect("mongodb://localhost:27017/Civitas", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', (_) =>
console.log('MongoDB is now connected:')  
// console.log('MongoDB is now connected:', process.env.MONGODB_URL)
);
db.on('error', (err) => console.error('MongoDB connection error!', err));
