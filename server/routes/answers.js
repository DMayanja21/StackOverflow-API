const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");

// Token handling functions
import {
    createToken,
    retrieveToken,
    verifyToken
} from "./token-handling-functions";

// All endpoints are JWT protected
// Get all the answers to a qn
router.get("/:questionID", retrieveToken, (req, res) => {
    verifyToken(req.token)
        .then(authData => {
            // Authdata is available if required
            if (authData === 403) {
                res.status(403).json({
                    status: 403,
                    message: "Invalid credentials"
                });
                return

            }
            let questionID = req.params.questionID;

            Answer.find({
                    question_id: questionID
                })
                .then(result => {
                    if (result && result.length) {
                        res.status(200).json(result);
                    } else {
                        res.status(404).json({
                            status: 404,
                            message: "That question has no answers yet"
                        });
                    }
                })
                .catch(err => {
                    let message = `An error occurred querying MongoDB for answers to question: ${questionID}`;
                    console.error(message, err);
                    res.status(500).json({
                        status: 500,
                        message,
                        err
                    });
                });
        })
        .catch(err => {
            let message = `An error occurred verifying token answer with ID:${questionID}`;
            console.error(message, err);
            res.status(500).json({
                status: 500,
                message,
                err
            });
        });
});

//Get all the answers by a single user
router.get("/user/:userID", retrieveToken, (req, res) => {
    verifyToken(req.token).then(authData => {
        // Authdata is available if required
        if (authData === 403) {
            res.status(403).json({
                status: 403,
                message: "Invalid credentials"
            });
        }

        let userID = req.params.userID;
        Answer.find({
                user_id: userID
            })
            .then(results => {
                if (results && results.length) {
                    res.status(200).json({
                        status: 200,
                        results
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: `No answers by user:${userID} were found`
                    })
                }
            })
            .catch(err => {
                if (err) {
                    console.error(`Error while searching for answers by user:${userID}`, err)
                    res.status(500).json({
                        message: `Error while searching for answers by user:${userID}`,
                        err
                    })
                }
            })
    });
});

// Answer a question
router.post('/', retrieveToken, (req, res) => {
    verifyToken(req.token)
        .then((authData) => {
            // Authdata is available if needed
            if (authData === 403) {
                res.status(403).json({
                    status: 403,
                    message: "Invalid credentials"
                });
                return

            }

            let question_id = req.body.question_id;
            let user_id = authData.user.user_id;
            let text = req.body.text;

            let newAnswer = new Answer({
                question_id,
                user_id,
                text
            });

            newAnswer.save()
                .then(result => {
                    res.status(201).json({
                        message: "Success saving answer",
                        status: 201
                    })
                })
                .catch(err => {
                    console.error(`Error while saving answer to database : ${err}`);
                    res.status(500).json({
                        message: `Error while saving answer to database`,
                        err
                    });
                });

        })
        .catch(err => {
            if (err) {
                let message = `An error ocurred validating user token`
                console.error(message, err);
                res.status(500).json({
                    status: 500,
                    message,
                    err,
                })
            }
        })
});


// Accept an answer
router.patch('/accept/:answerID', retrieveToken, (req, res) => {
    verifyToken(req.token)
        .then((authData) => {
            // Authdata is available if needed
            if (authData === 403) {
                res.status(403).json({
                    status: 403,
                    message: "Invalid credentials"
                });
                return
            }

            let answerID = req.params.answerID;
            const filter = {
                _id: answerID
            };
            const update = {
                preferred: true
            };
            Answer.findOneAndUpdate(filter, update)
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => {
                    let message = `Error updating answer:${answerID}`;
                    console.error(message, err);
                    res.status(500).json(message, error)
                })
        })
        .catch(err => {
            let message = `Error verifying user token to update answer:${answerID}`;
            console.error(message, err);
            res.status(500).json(message, error)
        })
})

// Upvote an answer

// Flag an answer as accepted

module.exports = router;