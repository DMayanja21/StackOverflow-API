// Calling dependencies
/**
 ES6 imports
 import "express" as express
 import body-parser as bodyParser from "body-parser"
 */
const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const userRoutes = require('../routes/users');
const answerRoutes = require('../routes/answers');
const questionRoutes = require('../routes/questions');

// Middleware for uploading files to the backend
// const fileUpload = require("express-fileupload");

// Load environmental variables
// require("dotenv").config();

const app = express();

// file uploader middleware
// app.use(fileUpload());
// bodyParser middleware
app.use(bodyParser.json());


// Routes
app.use('/auth', userRoutes);
app.use('/answers', answerRoutes);
app.use('/questions', questionRoutes);

// Catch all GET request
app.get('/*', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the StackOverflow-EDU API. You can use any of the following routes:',
    auth: '/auth',
    answers: '/answers',
    questions: '/questions',
    note: 'Most endpoints in the routes are JWT protected.',
  });
});
// Designating folder with all the app contents
// app.use(express.static("./client/public"));

// Setting up entry point for html
// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "/client/index.html"));
// });

module.exports = app;
