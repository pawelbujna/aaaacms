"use strict";

module.exports = function (_ref) {
  var env = _ref.env;
  return {
    defaultConnection: "default",
    connections: {
      "default": {
        connector: "mongoose",
        settings: {
          uri: env("DATABASE_URI")
        },
        options: {
          ssl: true
        }
      }
    }
  };
};