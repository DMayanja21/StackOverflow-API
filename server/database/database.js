const db = 'database';

const mongoose = require('mongoose');

const DB_URI = process.env.MONGODB_URI || 'mongodb+srv://stackOverflowEDU:stackOverflowEDU@byarentcluster-gfhab.mongodb.net/stackOverflowEDU?retryWrites=true&w=majority';

/**
 *
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@byarentcluster-gfhab.mongodb.net/admin?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

 */


const connect = () => new Promise((resolve, reject) => {
  // Connect to the database then resolve the promise
  // const conn = mongoose
  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res, err) => {
      if (err) {
        console.err('Error connecting to database=>', err);
        return reject(err);
      }

      console.log('Database online');

      resolve();
    });
});

const close = () => {
  console.log('Database gone offline');
  return mongoose.disconnect();
};

module.exports = {
  connect,
  close,
};
