"use strict";

var cov_2d4wwecx8x = function () {
  var path = "/Users/Paul/Desktop/Repositories/Github/StackOverflow-API/server/models/Answer.js";
  var hash = "86647b4dbcf37018a39f46335084a2c753f94d2e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/Paul/Desktop/Repositories/Github/StackOverflow-API/server/models/Answer.js",
    statementMap: {
      "0": {
        start: {
          line: 2,
          column: 17
        },
        end: {
          line: 2,
          column: 36
        }
      },
      "1": {
        start: {
          line: 7,
          column: 4
        },
        end: {
          line: 7,
          column: 12
        }
      },
      "2": {
        start: {
          line: 10,
          column: 21
        },
        end: {
          line: 61,
          column: 2
        }
      },
      "3": {
        start: {
          line: 64,
          column: 15
        },
        end: {
          line: 64,
          column: 53
        }
      },
      "4": {
        start: {
          line: 65,
          column: 0
        },
        end: {
          line: 65,
          column: 24
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0
    },
    f: {},
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "86647b4dbcf37018a39f46335084a2c753f94d2e"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  return coverage[path] = coverageData;
}();

// Call mongoose
var mongoose = (cov_2d4wwecx8x.s[0]++, require('mongoose')); // Call Schema constructor

var _ref = (cov_2d4wwecx8x.s[1]++, mongoose),
    Schema = _ref.Schema; // Create an answer schema


var answerSchema = (cov_2d4wwecx8x.s[2]++, new Schema({
  // answer_id: mongoose.Schema.Types.ObjectId,
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  status: {
    upvotes: [{
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
    }],
    downvotes: [{
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
    }]
  },
  preferred: {
    type: Boolean,
    required: true,
    "default": false
  },
  comments: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    date: {
      type: Date,
      "default": new Date(),
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  }]
})); // Export model

var Answer = (cov_2d4wwecx8x.s[3]++, mongoose.model('Answer', answerSchema));
cov_2d4wwecx8x.s[4]++;
module.exports = Answer;
//# sourceMappingURL=Answer.js.map