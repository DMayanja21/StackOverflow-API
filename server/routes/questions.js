// Token handling functions
import {
  createToken,
  retrieveToken,
  verifyToken,
} from './token-handling-functions';

const express = require('express');

const router = express.Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');

// Get all questions
// Unprotected endpoint
router.get('/', (req, res) => {
  Question.find()
    .then((results) => {
      if (results && results.length) {
        res.status(200).json(results);
      } else {
        res.status(404).json({
          status: 404,
          message: 'No questions found',
        });
      }
    })
    .catch((err) => {
      const message = 'An error occurred querying MongoDB for all questions';
      console.error(message, err);
      res.status(500).json({
        status: 500,
        message,
        err,
      });
    });
});

// Get a single question object
// Unprotected endpoint
router.get('/:questionID', (req, res) => {
  const { questionID } = req.params;

  Question.findOne({
    _id: questionID,
  })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          status: 404,
          message: 'That question does not exist',
        });
      }
    })
    .catch((err) => {
      const message = `An error occurred querying MongoDB for question with ID:${questionID}`;
      console.error(message, err);
      res.status(500).json({
        status: 500,
        message,
        err,
      });
    });
});

// Post a question
// Endpoint protected by JWT
router.post('/', retrieveToken, (req, res) => {
  verifyToken(req.token)
    .then((authData) => {
      // authData is available if needed
      if (authData === 403) {
        res.status(403).json({
          status: 403,
          message: 'Invalid credentials',
        });
        return;
      }

      const { user_id } = authData.user;
      const { title } = req.body;
      const { text } = req.body;

      const newQuestion = new Question({
        user_id,
        title,
        text,
      });

      newQuestion
        .save()
        .then((result) => {
          res.status(201).json(result);
        })
        .catch((err) => {
          if (err) {
            const message = 'There was an error saving the question';
            console.error(message, err);
            res.status(500).json({
              status: 500,
              message,
              err,
            });
          }
        });
      //
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

// Get all questions by a user
router.get('/user/:userID', (req, res) => {
  const { userID } = req.params;

  Question.find({
    user_id: userID,
  })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          status: 404,
          message: 'No questions found',
        });
      }
    })
    .catch((err) => {
      if (err) {
        const message = `No questions by user: ${userID} were found`;
        console.error(message, err);
        res.status(500).json({
          message,
          err,
        });
      }
    });
});

// Delete a question
router.delete('/:questionID', retrieveToken, (req, res) => {
  verifyToken(req.token)
    .then((authData) => {
      if (authData === 403) {
        res.status(403).json({
          status: 403,
          message: 'Invalid credentials',
        });
        return;
      }

      const { questionID } = req.params;

      // Create the object that will be returned
      const resultsOfOperation = {};

      Question.findByIdAndDelete({
        _id: questionID,
      })
        .then((result) => {
          if (result !== null) {
            // Attach results of deleting qn to the resultsOfOperation object
            resultsOfOperation.qnResult = result;
            Answer.deleteMany({
              question_id: questionID,
            })
              .then((result) => {
                // If result === null or result.n===0, then no answers were found
                if (result !== null && result.n !== 0) {
                  resultsOfOperation.ansResults = result;

                  return resultsOfOperation;
                }
                resultsOfOperation.ansResults = {
                  message:
                                        'No answers were attached to the qn',
                };
                return resultsOfOperation;
              })
              .then((results) => {
                res.status(200).json(results);
              })
              .catch((err) => {
                const message = `Error deleting answers related to question:${questionID}`;
                console.error(message, err);
                res.status(500).json({
                  message,
                  err,
                });
              });
          } else {
            const message = `Error 404 deleting question:${questionID}, Not found`;
            console.error(message);
            res.status(404).json({
              message,
            });
          }

          // return resultsOfOperation
        })
        .catch((err) => {
          if (err) {
            const message = `Error deleting question:${questionID}`;
            console.error(message, err);
            res.status(500).json({
              message,
              err,
            });
          }
        });
    })
    .catch((err) => {
      if (err) {
        const message = `Error verifying user token to delete question:${questionID}`;
        console.error(message, err);
        res.status(500).json({
          message,
          err,
        });
      }
    });
});

module.exports = router;
