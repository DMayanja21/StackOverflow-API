// // Call testing languages
// import chai from "chai";
// import chaiHttp from "chai-http";

// // Call mongoose and memory-server to create a fake db for testing purposes
// import mongoose from "mongoose";
// import MongoMemoryServer from "mongodb-memory-server-core";

// // Import the app we're testing
// import app from "../../../server/app/app";

// chai.use(chaiHttp);
// const {
//     expect,
//     request
// } = chai;
// let mongoServer;

// before(done => {
//     mongoServer = new MongoMemoryServer();
//     const opts = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     };
//     mongoServer
//         .getConnectionString()
//         .then(mongoUri =>
//             mongoose.connect(mongoUri, opts, err => {
//                 if (err) done(err);
//             })
//         )
//         .then(() => done());
// });

// after(async () => {
//     await mongoose.disconnect();
//     await mongoServer.stop();
// });