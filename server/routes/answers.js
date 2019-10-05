const express = require('express');
const router = express.Router();
const Answer = require("../models/Answer");

//Token handling functions
let tokenHandlers = require("./token-handling-functions");
let createToken = tokenHandlers.createToken;
let retrieveToken = tokenHandlers.retrieveToken;
let verifyToken = tokenHandlers.verifyToken;



module.exports = router