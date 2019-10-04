//Call dependencies
const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Token handling functions
let tokenHandlers = require("./token-handling-functions");
let createToken = tokenHandlers.createToken;
let retrieveToken = tokenHandlers.retrieveToken;
let verifyToken = tokenHandlers.verifyToken;

//Handling GET requests for all users
router.get("/", (req, res) => {

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

//Handling GET requests for a single user
router.get("/:userID", retrieveToken, (req, res) => {
    console.log("request token is=>", req.token);
    console.log("Get all users triggered");

    let userID = req.params.userID;

    verifyToken(req.token)
        .then(authData => {
            //authData is available if needed

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
        })


});

//Handling POST requests for creating a new user
router.post("/signup", (req, res) => {
    console.log(req.body);
    const user = new User();
    user.first_name = req.body.firstName;
    user.last_name = req.body.lastName;
    user.email_address = req.body.emailAddress;
    user.setPassword(req.body.password);

    user
        .save()
        .then(result => {
            // console.log("This is the new user object before saving=>", user)
            //console.log("This is the result=>", result);
            //jwt.sign({user}, )
            res.status(200).json({
                result,
                message: "Success creating new User"
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                err,
                message: "Error creating new User"
            });
        });
});

//Handling POST requests for login in a user

router.post("/login", (req, res) => {
    console.log(req.body);

    let userEmail = req.body.emailAddress;
    let userPassword = req.body.password;

    User.findOne({
            email_address: userEmail
        },
        function (err, retrievedUser) {
            if (retrievedUser !== null) {
                //Check if the password received is valid
                let passwordIsValid = retrievedUser.validPassword(userPassword);
                if (passwordIsValid === true) {
                    //construct a user object to send back to the
                    //front end that doesnt include the password details
                    let user = {
                        user_id: retrievedUser._id,
                        first_name: retrievedUser.first_name,
                        last_name: retrievedUser.last_name,
                        email_address: retrievedUser.email_address
                    };

                    //Creates a JWT (token). user object must have a user_id
                    createToken(user).then(token => {
                        //console.log("token received=>", token)
                        res.status(200).json({
                            token
                        });
                    });
                } else {
                    //When password is invalid, login is rejected
                    res.status(401).json({
                        status: 401,
                        message: `Credentials are invalid`
                    });
                }
            } else if (err) {
                console.error(
                    `There was an error:${err} while finding user: ${req.body} in the database`
                );
                res.status(500).json({
                    status: 500,
                    err: err,
                    message: `There was an error logging in`
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: `The user does not exist`
                });
            }
        }
    );
});
//Handing PATCH requests for updating a user
//Handling DELETE requests for deleting a user

module.exports = router;