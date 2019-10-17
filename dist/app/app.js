"use strict";

var cov_1u333bdfgl = function () {
  var path = "/Users/Paul/Desktop/Repositories/Github/StackOverflow-API/server/app/app.js";
  var hash = "0605d0edf68d1c6196ba9fdd847e91451e996c1d";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/Paul/Desktop/Repositories/Github/StackOverflow-API/server/app/app.js",
    statementMap: {
      "0": {
        start: {
          line: 7,
          column: 16
        },
        end: {
          line: 7,
          column: 34
        }
      },
      "1": {
        start: {
          line: 8,
          column: 19
        },
        end: {
          line: 8,
          column: 41
        }
      },
      "2": {
        start: {
          line: 10,
          column: 13
        },
        end: {
          line: 10,
          column: 28
        }
      },
      "3": {
        start: {
          line: 11,
          column: 19
        },
        end: {
          line: 11,
          column: 45
        }
      },
      "4": {
        start: {
          line: 12,
          column: 21
        },
        end: {
          line: 12,
          column: 49
        }
      },
      "5": {
        start: {
          line: 13,
          column: 23
        },
        end: {
          line: 13,
          column: 53
        }
      },
      "6": {
        start: {
          line: 21,
          column: 12
        },
        end: {
          line: 21,
          column: 21
        }
      },
      "7": {
        start: {
          line: 26,
          column: 0
        },
        end: {
          line: 26,
          column: 27
        }
      },
      "8": {
        start: {
          line: 30,
          column: 0
        },
        end: {
          line: 30,
          column: 29
        }
      },
      "9": {
        start: {
          line: 31,
          column: 0
        },
        end: {
          line: 31,
          column: 34
        }
      },
      "10": {
        start: {
          line: 32,
          column: 0
        },
        end: {
          line: 32,
          column: 38
        }
      },
      "11": {
        start: {
          line: 35,
          column: 0
        },
        end: {
          line: 43,
          column: 3
        }
      },
      "12": {
        start: {
          line: 36,
          column: 2
        },
        end: {
          line: 42,
          column: 5
        }
      },
      "13": {
        start: {
          line: 52,
          column: 0
        },
        end: {
          line: 52,
          column: 21
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 35,
            column: 14
          },
          end: {
            line: 35,
            column: 15
          }
        },
        loc: {
          start: {
            line: 35,
            column: 28
          },
          end: {
            line: 43,
            column: 1
          }
        },
        line: 35
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0,
      "12": 0,
      "13": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "0605d0edf68d1c6196ba9fdd847e91451e996c1d"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  return coverage[path] = coverageData;
}();

// Calling dependencies

/**
 ES6 imports
 import "express" as express
 import body-parser as bodyParser from "body-parser"
 */
var express = (cov_1u333bdfgl.s[0]++, require('express'));
var bodyParser = (cov_1u333bdfgl.s[1]++, require('body-parser'));
var path = (cov_1u333bdfgl.s[2]++, require('path'));
var userRoutes = (cov_1u333bdfgl.s[3]++, require('../routes/users'));
var answerRoutes = (cov_1u333bdfgl.s[4]++, require('../routes/answers'));
var questionRoutes = (cov_1u333bdfgl.s[5]++, require('../routes/questions')); // Middleware for uploading files to the backend
// const fileUpload = require("express-fileupload");
// Load environmental variables
// require("dotenv").config();

var app = (cov_1u333bdfgl.s[6]++, express()); // file uploader middleware
// app.use(fileUpload());
// bodyParser middleware

cov_1u333bdfgl.s[7]++;
app.use(bodyParser.json()); // Routes

cov_1u333bdfgl.s[8]++;
app.use('/auth', userRoutes);
cov_1u333bdfgl.s[9]++;
app.use('/answers', answerRoutes);
cov_1u333bdfgl.s[10]++;
app.use('/questions', questionRoutes); // Catch all GET request

cov_1u333bdfgl.s[11]++;
app.get('/*', function (req, res) {
  cov_1u333bdfgl.f[0]++;
  cov_1u333bdfgl.s[12]++;
  res.status(200).json({
    message: 'Welcome to the StackOverflow-EDU API. You can use any of the following routes:',
    auth: '/auth',
    answers: '/answers',
    questions: '/questions',
    note: 'Most endpoints in the routes are JWT protected.'
  });
}); // Designating folder with all the app contents
// app.use(express.static("./client/public"));
// Setting up entry point for html
// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "/client/index.html"));
// });

cov_1u333bdfgl.s[13]++;
module.exports = app;
//# sourceMappingURL=app.js.map