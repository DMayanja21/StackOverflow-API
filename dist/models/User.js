"use strict";

var cov_18rzj5vq7b = function () {
  var path = "/Users/Paul/Desktop/Repositories/Github/StackOverflow-API/server/models/User.js";
  var hash = "7855dbfc4bf85ee88844cbb53f4f277159f1f8c8";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/Paul/Desktop/Repositories/Github/StackOverflow-API/server/models/User.js",
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
          line: 5,
          column: 19
        },
        end: {
          line: 5,
          column: 27
        }
      },
      "2": {
        start: {
          line: 8,
          column: 15
        },
        end: {
          line: 8,
          column: 32
        }
      },
      "3": {
        start: {
          line: 11,
          column: 19
        },
        end: {
          line: 33,
          column: 2
        }
      },
      "4": {
        start: {
          line: 36,
          column: 0
        },
        end: {
          line: 43,
          column: 2
        }
      },
      "5": {
        start: {
          line: 37,
          column: 2
        },
        end: {
          line: 37,
          column: 58
        }
      },
      "6": {
        start: {
          line: 39,
          column: 2
        },
        end: {
          line: 41,
          column: 21
        }
      },
      "7": {
        start: {
          line: 46,
          column: 0
        },
        end: {
          line: 53,
          column: 2
        }
      },
      "8": {
        start: {
          line: 47,
          column: 15
        },
        end: {
          line: 49,
          column: 20
        }
      },
      "9": {
        start: {
          line: 52,
          column: 2
        },
        end: {
          line: 52,
          column: 33
        }
      },
      "10": {
        start: {
          line: 54,
          column: 13
        },
        end: {
          line: 54,
          column: 47
        }
      },
      "11": {
        start: {
          line: 56,
          column: 0
        },
        end: {
          line: 56,
          column: 22
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 36,
            column: 33
          },
          end: {
            line: 36,
            column: 34
          }
        },
        loc: {
          start: {
            line: 36,
            column: 53
          },
          end: {
            line: 43,
            column: 1
          }
        },
        line: 36
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 46,
            column: 35
          },
          end: {
            line: 46,
            column: 36
          }
        },
        loc: {
          start: {
            line: 46,
            column: 55
          },
          end: {
            line: 53,
            column: 1
          }
        },
        line: 46
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
      "11": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "7855dbfc4bf85ee88844cbb53f4f277159f1f8c8"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  return coverage[path] = coverageData;
}();

// Call mongoose
var mongoose = (cov_18rzj5vq7b.s[0]++, require('mongoose')); // Call Schema constructor

var _ref = (cov_18rzj5vq7b.s[1]++, mongoose),
    Schema = _ref.Schema; // Library for hashing passwords (encryption)


var crypto = (cov_18rzj5vq7b.s[2]++, require('crypto')); // Creating a user schema

var userSchema = (cov_18rzj5vq7b.s[3]++, new Schema({
  // user_id: mongoose.Schema.Types.ObjectId,
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email_address: {
    type: String,
    required: true
  },
  user_salt: {
    type: String,
    required: true
  },
  user_hash: {
    type: String,
    required: true
  }
})); // Password Encryption

cov_18rzj5vq7b.s[4]++;

userSchema.methods.setPassword = function (password) {
  cov_18rzj5vq7b.f[0]++;
  cov_18rzj5vq7b.s[5]++;
  this.user_salt = crypto.randomBytes(16).toString('hex');
  cov_18rzj5vq7b.s[6]++;
  this.user_hash = crypto.pbkdf2Sync(password, this.user_salt, 1000, 64, 'sha512').toString('hex'); // console.log("The user hash", this.user_hash)
}; // Login password validation


cov_18rzj5vq7b.s[7]++;

userSchema.methods.validPassword = function (password) {
  cov_18rzj5vq7b.f[1]++;
  var hash = (cov_18rzj5vq7b.s[8]++, crypto.pbkdf2Sync(password, this.user_salt, 1000, 64, 'sha512').toString('hex')); // Returns either true or false depending on if the password matches the hashed value stored

  cov_18rzj5vq7b.s[9]++;
  return this.user_hash === hash;
};

var User = (cov_18rzj5vq7b.s[10]++, mongoose.model('User', userSchema));
cov_18rzj5vq7b.s[11]++;
module.exports = User;
//# sourceMappingURL=User.js.map