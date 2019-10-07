// Call dependencies
const express = require("express");

const router = express.Router();
const User = require("../models/User");

// Token handling functions
import {
    createToken,
    retrieveToken,
    verifyToken
} from "./token-handling-functions";

// Handling GET requests for all users
router.get("/", (req, res) => {
    // This is an unprotected route that retrieves all users
    // It only exists for testing purposes

    User.find().then(result => {
        if (result && result.length) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: "No users found"
            });
        }
    });
});

// Handling GET requests for a single user
router.get("/:userID", retrieveToken, (req, res) => {
    // This endpoint is protected b JWT usage.
    // The createToken retrieveToken and verifyToken methods
    // are all in the ./token-handling-functions.js file

    const {
        userID
    } = req.params;

    verifyToken(req.token).then(authData => {
        // authData is available if needed
        if (authData === 403) {
            res.status(403).json({
                status: 403,
                message: "Invalid credentials"
            });
            return
        }

        User.findOne({
            _id: userID
        }).then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    status: 404,
                    message: "No such user found"
                });
            }
        });
    });
});

// Handling POST requests for creating a new user
router.post("/signup", (req, res) => {
    // Constructing new user from the information received.
    const user = new User();
    user.first_name = req.body.firstName;
    user.last_name = req.body.lastName;
    user.email_address = req.body.emailAddress;
    user.setPassword(req.body.password);

    user.save()
        .then(result => {
            res.status(201).json({
                result,
                message: "Success creating new User"
            });
        })
        .catch(err => {
            console.error(
                `An error occurred saving new user ${user} in database Error:${err}`
            );
            res.status(500).json({
                err,
                message: `An error occurred saving new user ${user} in database`
            });
        });
});

// Handling POST requests for login in a user
router.post("/login", (req, res) => {
    // Retrieving login detailss to be verified
    const userEmail = req.body.emailAddress;
    const userPassword = req.body.password;

    // Searching for matching user in the database
    User.findOne({
            email_address: userEmail
        },
        (err, retrievedUser) => {
            if (retrievedUser !== null) {
                // Check if the password received is valid
                const passwordIsValid = retrievedUser.validPassword(
                    userPassword
                );
                if (passwordIsValid === true) {
                    // Construct a user object to send back to the front end
                    const user = {
                        user_id: retrievedUser._id,
                        first_name: retrievedUser.first_name,
                        last_name: retrievedUser.last_name,
                        email_address: retrievedUser.email_address
                    };

                    // Creates a JWT (token) to secure any further user transactions
                    createToken(user).then(token => {
                        res.status(200).json({
                            token
                        });
                    });
                } else {
                    // When password is invalid, login is rejected
                    res.status(401).json({
                        status: 401,
                        message: "Credentials are invalid"
                    });
                }
            } else if (err) {
                // Throw a generic error for any uncovered cases
                console.error(
                    `There was an error:${err} while finding user: ${req.body} in the database`
                );
                res.status(500).json({
                    status: 500,
                    err,
                    message: "There was an error logging in"
                });
            } else {
                // Throw an error if no user was found in the database
                res.status(404).json({
                    status: 404,
                    message: "The user does not exist"
                });
            }
        }
    );
});

// Handing PATCH requests for updating a user
// Handling DELETE requests for deleting a user

module.exports = router;