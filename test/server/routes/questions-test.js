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
    useFindAndModify: false,
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
// The id of the new question, which will be required for some tests
let questionID;

// Function containing all the tests for the questions router
// Logs the purpose of the tests to the console
describe('Test all API endpoints for /questions', () => {
  // Test 1: test user signup
  it('First creates a new user via /auth because several /questions endpoints are JWT protected', (done) => {
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
          `An error occurred testing /auth/signup endpoint Error:${err}`,
        );
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
          `An error occurred testing /auth/login endpoint Error:${err}`,
        );
      });
  });


  it('Asks / Posts a question', (done) => {
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
        expect(response).to.be.an('object');
        expect(response).to.include.all.keys('status', '_id', 'user_id', 'title', 'text');
        done();
      })
      .catch((err) => {
        const message = 'An error occurred testing POST /questions endpoint';
        console.error(message, err);
      });
  });

  // Unprotected endpoint
  it('Gets a single question', (done) => {
    request(app)
      .get(`/questions/${questionID}`)
      .then((res) => {
        const {
          status,
        } = res;
        const response = res.body;

        // Conditions to test
        expect(status).to.equal(200);
        expect(response).to.be.an('object');
        expect(response).to.include.all.keys('status', '_id', 'user_id', 'title', 'text');
        done();
      })
      .catch((err) => {
        const message = 'An error occurred testing POST /questions endpoint';
        console.error(message, err);
      });
  });

  it('Gets all questions by a user', (done) => {
    request(app)
      .get(`/questions/user/${userID}`)
      .set('Authorization', `Bearer ${testToken}`)
      .then((res) => {
        const {
          status,
        } = res;
        const response = res.body;

        expect(status).to.equal(200);
        expect(response).to.exist;
        expect(response).to.be.an('array');
        done();
      })
      .catch((err) => {
        const message = 'An error occurred testing GET /questions/:userID endpoint';
        console.error(message, err);
      });
  });

  it('Deletes a question', (done) => {
    request(app)
      .delete(`/questions/${questionID}`)
      .set('Authorization', `Bearer ${testToken}`)
      .then((res) => {
        const {
          status,
        } = res;
        const response = res.body;

        // Conditions to test
        expect(status).to.equal(200);
        expect(response).to.exist;
        expect(response).to.be.an('object');
        expect(response).to.include.all.keys('qnResult', 'ansResults');
        done();
      });
  });
});
