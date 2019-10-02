//Call dependencies
const express = require('express');
const router = express.Router();
const User = require('../models/User');

//Handling GET requests for all users


//Handling GET requests for a single user
//Handling POST requests for creating a new user
router.post("/signup", (req, res) => {
    console.log(req.body);
    const user = new User();
    user.first_name = req.body.firstName;
    user.last_name = req.body.lastName;
    user.email_address = req.body.emailAddress;
    user.setPassword(req.body.password);

    user.save()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                result,
                message: 'Success creating new User'
            })
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                err,
                message: 'Error creating new User'
            })
        });
});

//Handling POST requsets for login in a user
//Handing PATCH requests for updating a user
//Handling DELETE requests for deleting a user


module.exports = router;