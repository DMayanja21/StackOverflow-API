//Call testing languages
const expect = require("chai").expect;
const request = require("supertest");

//Call app that we're going to test
const app = require("../../../server/app/app");
const mongoose = require("mongoose");

// Call mongodb-memory-server for creating a fake db for testing purposes
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoServer = new MongoMemoryServer({
    debug: true
});

//Function containing all the tests
// Logs the purpose of the tests to the console
describe("Test all API endpoints for /auth", () => {
    // Starts the fake database
    before(done => {
        // const mongoServer = new MongoMemoryServer();
        const opts = {
            useNewUrlParser: true,

        };

        mongoServer
            .getConnectionString()
            .then(mongoUri => {
                return mongoose.connect(mongoUri, opts, err => {
                    if (err) done(err);
                });
            })
            .then(() => done())
            .catch(err => console.error({
                message: "An error occurred connecting to MongoDB Memory server",
                err
            }))
    });
    //   Disconnects the fake database only after all the tests have been run
    after(() => {
        mongoose.disconnect();
        mongoServer.stop();
    });


    // Test 1: test user signup
    it("Creates a new user", done => {
        request(app)
            .post("/auth/signup")
            .send({
                firstName: "Bob",
                lastName: "Paul",
                emailAddress: "email@address.com",
                password: "123"
            })
            .then(res => {
                const status = res.status;
                console.log("Status received=>", status)
                expect(status).to.equal(201);
                done();
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    });

})