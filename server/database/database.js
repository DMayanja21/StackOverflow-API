const mongoose = require("mongoose");

// const DB_URI = process.env.MONGODB_URI || 'mongodb+srv://stackOverflowEDU:stackOverflowEDU@byarentcluster-gfhab.mongodb.net/stackOverflowEDU?retryWrites=true&w=majority';

const DB_URI = "mongodb://localhost:27017/node-shop";
// Connect to database
const connect = () =>
    new Promise((resolve, reject) => {
        // Connect to the database then resolve the promise
        mongoose
            .connect(DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
            .then((res, err) => {
                if (err) {
                    console.err("Error connecting to database=>", err);
                    return reject(err);
                }

                console.log("Database online");

                resolve();
            });
    });

// Switch off database
const close = () => {
    console.log("Database gone offline");
    return mongoose.disconnect();
};

module.exports = {
    connect,
    close
};
