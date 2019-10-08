// Call testing languages
import chai from 'chai';
import chaiHttp from 'chai-http';

// Call mongoose and memory-server to create a fake db for testing purposes
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server-core';

// Import the app we're testing
import app from '../../../server/app/app';

chai.use(chaiHttp);
const {
    expect,
    request,
} = chai;
let mongoServer;

before((done) => {
    mongoServer = new MongoMemoryServer();
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    mongoServer
        .getConnectionString()
        .then((mongoUri) => mongoose.connect(mongoUri, opts, (err) => {
            if (err) done(err);
        }))
        .then(() => done());
});

after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

// The token that will be used for JWT auth
let testToken;
// The user id which will be required for some tests
let userID;
// The id of the qn which the answer will be attached to
let questionID;
// The id of the new answer, which will be required for some tests
let answerID;

// Function containing all the tests for the answers router
// Logs the purpose of the tests to the console
describe('Test all API endpoints for /answers', () => {
    // Test 1: test user signup
    it('First creates a new user via /auth because several /answers endpoints are JWT protected', (done) => {
        request(app)
            .post('/auth/signup')
            .send({
                firstName: 'Bob',
                lastName: 'Paul',
                emailAddress: 'email@address.com',
                password: '123',
            })
            .then((res) => {
                const {
                    status,
                } = res;
                expect(status).to.equal(201);
                done();
            })
            .catch((err) => {
                console.log(
                    `An error occurred testing /auth/signup endpoint Error:${err}`
                );
                return
            });
    });


    it('Logs in newly created user with the correct credentials', (done) => {
        request(app)
            .post('/auth/login')
            .send({
                emailAddress: 'email@address.com',
                password: '123',
            })
            .then((res) => {
                const {
                    status,
                } = res;
                const {
                    token,
                } = res.body;
                testToken = token;
                expect(status).to.equal(200);
                expect(token).to.exist;
                expect(typeof token === 'string').to.equal(true);
                done();
            })
            .catch((err) => {
                console.log(
                    `An error occurred testing /auth/login endpoint Error:${err}`
                );
                return
            });
    });


    it('Asks / Posts a question because answers need a qn to be attached to', (done) => {
        request(app)
            .post('/questions')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
                title: 'Question title',
                text: 'Question text',
            })
            .then((res) => {
                const {
                    status,
                } = res;
                const response = res.body;
                // Set the user id which will be used in later tests
                userID = response.user_id;
                questionID = response._id;


                // Conditions to test
                expect(status).to.equal(201);
                expect(response).to.exist;
                expect(response).to.be.an('object');
                expect(response).to.include.all.keys('status', '_id', 'user_id', 'title', 'text');
                done();
            })
            .catch((err) => {
                const message = 'An error occurred testing POST /questions endpoint';
                console.error(message, err);
                return
            });
    });


    it('Posts an answer', (done) => {
        request(app)
            .post('/answers')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
                question_id: questionID,
                user_id: userID,
                text: 'answer text',
            })
            .then((res) => {
                const {
                    status,
                } = res;
                const response = res.body;
                // Set the user id which will be used in later tests
                answerID = response._id;
                console.log("status received by test", status)
                console.log("Response received, id:", response.message)

                // console.log("Response after posting an answer")
                // Conditions to test
                expect(status).to.equal(201);
                expect(response).to.exist;
                expect(response).to.be.an('object');
                expect(response).to.include.all.keys('message', 'status', 'result');
                done();
            })
            .catch((err) => {
                const message = 'An error occurred testing POST /answers endpoint';
                console.error(message, err);
                return
            });
    });

    // Unprotected endpoint
    it('Gets all answers to a question', (done) => {
        request(app)
            .get(`/answers/${questionID}`)
            .then((res) => {
                const {
                    status,
                } = res;
                const response = res.body;

                // Conditions to test
                expect(status).to.equal(200);
                if (typeof response === 'object') {
                    expect(response).to.include.all.keys('status', '_id', 'user_id', 'title', 'text');
                } else if (typeof response === 'array') {
                    expect(response).to.not.be.empty;
                }
                done();
            })
            .catch((err) => {
                const message = 'An error occurred testing POST /answers endpoint';
                console.error(message, err);
                return
            });
    });

    it('Gets all answers by a user', (done) => {
        request(app)
            .get(`/answers/user/${userID}`)
            .set('Authorization', `Bearer ${testToken}`)
            .then((res) => {
                const {
                    status,
                } = res;
                const response = res.body;

                expect(status).to.equal(200);
                expect(response).to.exist;
                if (typeof response === 'object') {
                    expect(response).to.include.all.keys('status', '_id', 'user_id', 'title', 'text');
                } else if (typeof response === 'array') {
                    expect(response).to.not.be.empty;
                }
                done();
            })
            .catch((err) => {
                const message = 'An error occurred testing GET /answers/:userID endpoint';
                console.error(message, err);
                return
            });
    });


    // Accept an answer

    // it('Deletes an answer', (done) => {
    //     request(app)
    //         .delete(`/answers/${answerID}`)
    //         .set('Authorization', `Bearer ${testToken}`)
    //         .then((res) => {
    //             const {
    //                 status,
    //             } = res;
    //             const response = res.body;

    //             // Conditions to test
    //             expect(status).to.equal(200);
    //             expect(response).to.exist;
    //             expect(response).to.be.an('object');
    //             expect(response).to.include.all.keys('qnResult', 'ansResults');
    //             done();
    //         });
    // });
});