// Call testing languages
import chai from "chai";
import chaiHttp from "chai-http";

// Call mongoose and memory-server to create a fake db for testing purposes
import mongoose from "mongoose";
import MongoMemoryServer from "mongodb-memory-server-core";

// Import the app we're testing
import app from "../../../server/app/app";

chai.use(chaiHttp);
const { expect, request } = chai;
let mongoServer;

before(done => {
    mongoServer = new MongoMemoryServer();
    const opts = { useNewUrlParser: true, useUnifiedTopology: true };
    mongoServer
        .getConnectionString()
        .then(mongoUri =>
            mongoose.connect(mongoUri, opts, err => {
                if (err) done(err);
            })
        )
        .then(() => done());
});

after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

// Function containing all the tests
// Logs the purpose of the tests to the console
describe("Test all API endpoints for /auth", () => {
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
                const { status } = res;
                expect(status).to.equal(201);
                done();
            })
            .catch(err => {
                console.log(
                    `An error occurred testing /auth/signup endpoint Error:${err}`
                );
                res.status(500).json({
                    message: `An error occurred testing /auth/signup endpoint`,
                    err
                });
            });
    });

    it("Logs in newly created user with the correct credentials", done => {
        request(app)
            .post("/auth/login")
            .send({
                emailAddress: "email@address.com",
                password: "123"
            })
            .then(res => {
                const { status } = res;
                const { token } = res.body;
                expect(status).to.equal(200);
                expect(token).to.exist;
                expect(typeof token === "string").to.equal(true);
                done();
            })
            .catch(err => {
                console.log(
                    `An error occurred testing /auth/login endpoint Error:${err}`
                );
                res.status(500).json({
                    message: `An error occurred testing /auth/login endpoint`,
                    err
                });
            });
    });
});
