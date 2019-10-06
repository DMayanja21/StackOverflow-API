// Call testing languages
/*
import { expect } from "chai";
import { request } from "supertest";
import { request } from "supertest";
*/
import * as chai from 'chai';
import * as chaiHttp from 'chai-http';
chai.use(chaiHttp);
//const { expect, request } = require("chai");
import { expect, request } from chai
//const request = require("supertest");

// Call app that we're going to test
const mongoose = require("mongoose");

// Call mongodb-memory-server for creating a fake db for testing purposes
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const app = require("../../../server/app/app");

let mongoServer;

before(done => {
    mongoServer = new MongoMemoryServer();
    mongoServer
        .getConnectionString()
        .then(mongoUri =>
            mongoose.connect(mongoUri, err => {
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
                console.log(err);
                res.status(500).json({
                    error: err
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
                console.log("Response body=>", res);
                expect(status).to.equal(200);
                expect(token).to.exist;
                expect(typeof token === "string").to.equal(true);
                done();
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    });
});
