// Token handling functions
import {
  createToken,
  retrieveToken,
  verifyToken,
} from './token-handling-functions';

const express = require('express');

const router = express.Router();
const Answer = require('../models/Answer');


// Get all the answers to a qn

router.get('/byqn/:questionID', (req, res) => {
  const {
    questionID
  } = req.params;

  Answer.find({
      question_id: questionID,
    })
    .then((result) => {
      if (result && result.length) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          status: 404,
          message: 'That question has no answers yet',
        });
      }
    })
    .catch((err) => {
      const message = `An error occurred querying MongoDB for answers to question: ${questionID}`;
      console.error(message, err);
      res.status(500).json({
        status: 500,
        message,
        err,
      });
    });
});

// Get all the answers by a single user
router.get('/user/:userID', retrieveToken, (req, res) => {
  verifyToken(req.token).then((authData) => {
    // Authdata is available if required
    if (authData === 403) {
      res.status(403).json({
        status: 403,
        message: 'Invalid credentials',
      });
    }

    const {
      userID,
    } = req.params;
    Answer.find({
        user_id: userID,
      })
      .then((results) => {
        if (results) {
          res.status(200).json(results);
        } else {
          res.status(404).json({
            status: 404,
            message: `No answers by user:${userID} were found`,
          });
        }
      })
      .catch((err) => {
        if (err) {
          console.error(`Error while searching for answers by user:${userID}`, err);
          res.status(500).json({
            message: `Error while searching for answers by user:${userID}`,
            err,
          });
        }
      });
  });
});

// Answer a question
router.post('/', retrieveToken, (req, res) => {
  verifyToken(req.token)
    .then((authData) => {
      // Authdata is available if needed
      if (authData === 403) {
        console.log('Authdata error posting answer');
        res.status(403).json({
          status: 403,
          message: 'Invalid credentials',
        });
        return;
      }

      const {
        question_id,
      } = req.body;
      const {
        user_id,
      } = authData.user;
      const {
        text,
      } = req.body;

      const newAnswer = new Answer({
        question_id,
        user_id,
        text,
      });

      newAnswer.save()
        .then((result) => {
          res.status(201).json({
            message: 'Success saving answer',
            status: 201,
            result,
          });
        })
        .catch((err) => {
          console.error(`Error while saving answer to database : ${err}`);
          res.status(500).json({
            message: 'Error while saving answer to database',
            err,
          });
        });
    })
    .catch((err) => {
      if (err) {
        const message = 'An error ocurred validating user token';
        console.error(message, err);
        res.status(500).json({
          status: 500,
          message,
          err,
        });
      }
    });
});


// Accept an answer
router.patch('/accept/:answerID', retrieveToken, (req, res) => {
  verifyToken(req.token)
    .then((authData) => {
      // Authdata is available if needed
      if (authData === 403) {
        res.status(403).json({
          status: 403,
          message: 'Invalid credentials',
        });
        return;
      }

      const {
        answerID,
      } = req.params;
      const filter = {
        _id: answerID,
      };
      const update = {
        preferred: true,
      };
      Answer.findOneAndUpdate(filter, update)
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          const message = `Error updating answer:${answerID}`;
          console.error(message, err);
          res.status(500).json(message, err);
        });
    })
    .catch((err) => {
      const message = `Error verifying user token to update answer:${answerID}`;
      console.error(message, err);
      res.status(500).json(message, err);
    });
});

// Delete an answer
router.delete('/:answerID', retrieveToken, (req, res) => {
  verifyToken(req.token)
    .then((authData) => {
      // Authdata is available if needed
      if (authData === 403) {
        res.status(403).json({
          status: 403,
          message: 'Invalid credentials',
        });
        return;
      }

      const {
        answerID,
      } = req.params;

      Answer.findByIdAndDelete({
          _id: answerID,
        })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          const message = `Error deleting answer:${answerID}`;
          console.error(message, err);
          res.status(500).json(message, err);
        });
    })
    .catch((err) => {
      const message = `Error verifying user token to delete answer:${answerID}`;
      console.error(message, err);
      res.status(500).json(message, err);
    });
});

// Upvote an answer


// Flag an answer as accepted

module.exports = router;