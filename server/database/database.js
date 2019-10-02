let db = "database";

const mongoose = require("mongoose");
const DB_URI = process.env.MONGODB_URI || "";

const connect = () => {

    return new Promise((resolve, reject) => {
        //Connect to the database then resolve the promise
        //const conn = mongoose
        mongoose
            .connect(DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then((res, err) => {

                if (err) {
                    console.err("Error connecting to database=>", err)
                    return reject(err);
                }

                console.log("Database online");

                resolve();
            });
    });
}

const close = () => {
    console.log("Database gone offline");
    return mongoose.disconnect();
}

module.exports = {
    connect,
    close
};