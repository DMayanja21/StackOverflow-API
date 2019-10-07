const express = require('express');

const router = express.Router();
const Question = require('../models/Question');

// Token handling functions
const tokenHandlers = require('./token-handling-functions');

const {
    retrieveToken
} = tokenHandlers;
const {
    verifyToken
} = tokenHandlers;


// All endpoints are JWT protected
// Get a single question object
router.get("/:questionID", retrieveToken, (req, res) => {
    verifyToken(req.token)
        .then(authData => {
            // Authdata is available if required
            let questionID = req.params.questionID;

            Question.findOne({
                    _id: questionID
                })
                .then(result => {
                    if (result) {
                        res.status(200).json(result);
                    } else {
                        res.status(404).json({
                            status: 404,
                            message: "That question does not exist"
                        });
                    }
                })
                .catch(err => {
                    let message = `An error occurred querying MongoDB for question with ID:${questionID}`;
                    console.error(message, err);
                    res.status(500).json({
                        status: 500,
                        message,
                        err
                    });
                });
        })
        .catch(err => {
            let message = `An error occurred verifying token question with ID:${questionID}`;
            console.error(message, err);
            res.status(500).json({
                status: 500,
                message,
                err
            });
        });
});


module.exports = router;