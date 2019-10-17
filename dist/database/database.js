"use strict";

var cov_1rmyk0qrtq = function () {
  var path = "/Users/Paul/Desktop/Repositories/Github/StackOverflow-API/server/database/database.js";
  var hash = "02c861e6da48614320b6433bb14e0feb4175fad6";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/Paul/Desktop/Repositories/Github/StackOverflow-API/server/database/database.js",
    statementMap: {
      "0": {
        start: {
          line: 1,
          column: 17
        },
        end: {
          line: 1,
          column: 36
        }
      },
      "1": {
        start: {
          line: 3,
          column: 15
        },
        end: {
          line: 3,
          column: 169
        }
      },
      "2": {
        start: {
          line: 6,
          column: 16
        },
        end: {
          line: 24,
          column: 2
        }
      },
      "3": {
        start: {
          line: 6,
          column: 22
        },
        end: {
          line: 24,
          column: 2
        }
      },
      "4": {
        start: {
          line: 8,
          column: 2
        },
        end: {
          line: 23,
          column: 7
        }
      },
      "5": {
        start: {
          line: 15,
          column: 6
        },
        end: {
          line: 18,
          column: 7
        }
      },
      "6": {
        start: {
          line: 16,
          column: 8
        },
        end: {
          line: 16,
          column: 59
        }
      },
      "7": {
        start: {
          line: 17,
          column: 8
        },
        end: {
          line: 17,
          column: 27
        }
      },
      "8": {
        start: {
          line: 20,
          column: 6
        },
        end: {
          line: 20,
          column: 37
        }
      },
      "9": {
        start: {
          line: 22,
          column: 6
        },
        end: {
          line: 22,
          column: 16
        }
      },
      "10": {
        start: {
          line: 28,
          column: 14
        },
        end: {
          line: 31,
          column: 1
        }
      },
      "11": {
        start: {
          line: 29,
          column: 2
        },
        end: {
          line: 29,
          column: 39
        }
      },
      "12": {
        start: {
          line: 30,
          column: 2
        },
        end: {
          line: 30,
          column: 31
        }
      },
      "13": {
        start: {
          line: 33,
          column: 0
        },
        end: {
          line: 36,
          column: 2
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 6,
            column: 16
          },
          end: {
            line: 6,
            column: 17
          }
        },
        loc: {
          start: {
            line: 6,
            column: 22
          },
          end: {
            line: 24,
            column: 2
          }
        },
        line: 6
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 6,
            column: 34
          },
          end: {
            line: 6,
            column: 35
          }
        },
        loc: {
          start: {
            line: 6,
            column: 55
          },
          end: {
            line: 24,
            column: 1
          }
        },
        line: 6
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 14,
            column: 10
          },
          end: {
            line: 14,
            column: 11
          }
        },
        loc: {
          start: {
            line: 14,
            column: 24
          },
          end: {
            line: 23,
            column: 5
          }
        },
        line: 14
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 28,
            column: 14
          },
          end: {
            line: 28,
            column: 15
          }
        },
        loc: {
          start: {
            line: 28,
            column: 20
          },
          end: {
            line: 31,
            column: 1
          }
        },
        line: 28
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 3,
            column: 15
          },
          end: {
            line: 3,
            column: 169
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 3,
            column: 15
          },
          end: {
            line: 3,
            column: 38
          }
        }, {
          start: {
            line: 3,
            column: 42
          },
          end: {
            line: 3,
            column: 169
          }
        }],
        line: 3
      },
      "1": {
        loc: {
          start: {
            line: 15,
            column: 6
          },
          end: {
            line: 18,
            column: 7
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 15,
            column: 6
          },
          end: {
            line: 18,
            column: 7
          }
        }, {
          start: {
            line: 15,
            column: 6
          },
          end: {
            line: 18,
            column: 7
          }
        }],
        line: 15
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
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0,
      "12": 0,
      "13": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0]
    },
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "02c861e6da48614320b6433bb14e0feb4175fad6"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  return coverage[path] = coverageData;
}();

var mongoose = (cov_1rmyk0qrtq.s[0]++, require('mongoose'));
var DB_URI = (cov_1rmyk0qrtq.s[1]++, (cov_1rmyk0qrtq.b[0][0]++, process.env.MONGODB_URI) || (cov_1rmyk0qrtq.b[0][1]++, 'mongodb+srv://stackOverflowEDU:stackOverflowEDU@byarentcluster-gfhab.mongodb.net/stackOverflowEDU?retryWrites=true&w=majority')); // Connect to database

cov_1rmyk0qrtq.s[2]++;

var connect = function connect() {
  cov_1rmyk0qrtq.f[0]++;
  cov_1rmyk0qrtq.s[3]++;
  return new Promise(function (resolve, reject) {
    cov_1rmyk0qrtq.f[1]++;
    cov_1rmyk0qrtq.s[4]++;
    // Connect to the database then resolve the promise
    mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }).then(function (res, err) {
      cov_1rmyk0qrtq.f[2]++;
      cov_1rmyk0qrtq.s[5]++;

      if (err) {
        cov_1rmyk0qrtq.b[1][0]++;
        cov_1rmyk0qrtq.s[6]++;
        console.err('Error connecting to database=>', err);
        cov_1rmyk0qrtq.s[7]++;
        return reject(err);
      } else {
        cov_1rmyk0qrtq.b[1][1]++;
      }

      cov_1rmyk0qrtq.s[8]++;
      console.log('Database online');
      cov_1rmyk0qrtq.s[9]++;
      resolve();
    });
  });
}; // Switch off database


cov_1rmyk0qrtq.s[10]++;

var close = function close() {
  cov_1rmyk0qrtq.f[3]++;
  cov_1rmyk0qrtq.s[11]++;
  console.log('Database gone offline');
  cov_1rmyk0qrtq.s[12]++;
  return mongoose.disconnect();
};

cov_1rmyk0qrtq.s[13]++;
module.exports = {
  connect: connect,
  close: close
};
//# sourceMappingURL=database.js.map