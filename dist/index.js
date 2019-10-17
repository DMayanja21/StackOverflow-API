"use strict";

var cov_1vntv8vx6n = function () {
  var path = "/Users/Paul/Desktop/Repositories/Github/StackOverflow-API/server/index.js";
  var hash = "cbc5b9eeca413dd3c3a613c0c03bfa28779a4b38";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/Paul/Desktop/Repositories/Github/StackOverflow-API/server/index.js",
    statementMap: {
      "0": {
        start: {
          line: 6,
          column: 13
        },
        end: {
          line: 6,
          column: 28
        }
      },
      "1": {
        start: {
          line: 7,
          column: 12
        },
        end: {
          line: 7,
          column: 32
        }
      },
      "2": {
        start: {
          line: 9,
          column: 11
        },
        end: {
          line: 9,
          column: 41
        }
      },
      "3": {
        start: {
          line: 13,
          column: 13
        },
        end: {
          line: 13,
          column: 37
        }
      },
      "4": {
        start: {
          line: 16,
          column: 0
        },
        end: {
          line: 20,
          column: 3
        }
      },
      "5": {
        start: {
          line: 17,
          column: 17
        },
        end: {
          line: 17,
          column: 39
        }
      },
      "6": {
        start: {
          line: 19,
          column: 2
        },
        end: {
          line: 19,
          column: 75
        }
      },
      "7": {
        start: {
          line: 19,
          column: 28
        },
        end: {
          line: 19,
          column: 73
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 16,
            column: 18
          },
          end: {
            line: 16,
            column: 19
          }
        },
        loc: {
          start: {
            line: 16,
            column: 24
          },
          end: {
            line: 20,
            column: 1
          }
        },
        line: 16
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 19,
            column: 22
          },
          end: {
            line: 19,
            column: 23
          }
        },
        loc: {
          start: {
            line: 19,
            column: 28
          },
          end: {
            line: 19,
            column: 73
          }
        },
        line: 19
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 13,
            column: 13
          },
          end: {
            line: 13,
            column: 37
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 13,
            column: 13
          },
          end: {
            line: 13,
            column: 29
          }
        }, {
          start: {
            line: 13,
            column: 33
          },
          end: {
            line: 13,
            column: 37
          }
        }],
        line: 13
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {
      "0": [0, 0]
    },
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "cbc5b9eeca413dd3c3a613c0c03bfa28779a4b38"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  return coverage[path] = coverageData;
}();

// Import babel patches for async functions
// import "core-js/stable";
// import "regenerator-runtime/runtime";
// Import the app(routes)
var http = (cov_1vntv8vx6n.s[0]++, require('http'));
var app = (cov_1vntv8vx6n.s[1]++, require('./app/app')); // Import the database connection

var db = (cov_1vntv8vx6n.s[2]++, require('./database/database')); // create a server which hosts both

var port = (cov_1vntv8vx6n.s[3]++, (cov_1vntv8vx6n.b[0][0]++, process.env.PORT) || (cov_1vntv8vx6n.b[0][1]++, 3000)); // Connect to the database(in database.js), then start the server with the app compiled from app.js

cov_1vntv8vx6n.s[4]++;
db.connect().then(function () {
  cov_1vntv8vx6n.f[0]++;
  var server = (cov_1vntv8vx6n.s[5]++, http.createServer(app));
  cov_1vntv8vx6n.s[6]++;
  server.listen(port, function () {
    cov_1vntv8vx6n.f[1]++;
    cov_1vntv8vx6n.s[7]++;
    return console.log("Server started on port ".concat(port));
  });
});
//# sourceMappingURL=index.js.map