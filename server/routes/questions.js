const express = require('express');

const router = express.Router();
const Question = require('../models/Question');

// Token handling functions
const tokenHandlers = require('./token-handling-functions');

const { createToken } = tokenHandlers;
const { retrieveToken } = tokenHandlers;
const { verifyToken } = tokenHandlers;


module.exports = router;
