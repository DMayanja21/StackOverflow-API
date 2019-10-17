"use strict";

var cov_vqfltpcij = function () {
  var path = "/Users/Paul/Desktop/Repositories/Github/StackOverflow-API/server/models/Question.js";
  var hash = "e8ca753391ed15280dd571d6db9f35a9bddd6885";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/Paul/Desktop/Repositories/Github/StackOverflow-API/server/models/Question.js",
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
          column: 23
        },
        end: {
          line: 42,
          column: 2
        }
      },
      "3": {
        start: {
          line: 45,
          column: 17
        },
        end: {
          line: 45,
          column: 59
        }
      },
      "4": {
        start: {
          line: 46,
          column: 0
        },
        end: {
          line: 46,
          column: 26
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
    hash: "e8ca753391ed15280dd571d6db9f35a9bddd6885"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  return coverage[path] = coverageData;
}();

// Call mongoose
var mongoose = (cov_vqfltpcij.s[0]++, require('mongoose')); // Call Schema constructor

var _ref = (cov_vqfltpcij.s[1]++, mongoose),
    Schema = _ref.Schema; // Create a question schema


var questionSchema = (cov_vqfltpcij.s[2]++, new Schema({
  // question_id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
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
  answer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }
})); // Export model

var Question = (cov_vqfltpcij.s[3]++, mongoose.model('Question', questionSchema));
cov_vqfltpcij.s[4]++;
module.exports = Question;
//# sourceMappingURL=Question.js.map