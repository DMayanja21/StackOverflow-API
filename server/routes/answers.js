const express = require('express');

const router = express.Router();
const Answer = require('../models/Answer');

// Token handling functions
const tokenHandlers = require('./token-handling-functions');

const { createToken } = tokenHandlers;
const { retrieveToken } = tokenHandlers;
const { verifyToken } = tokenHandlers;


module.exports = router;
