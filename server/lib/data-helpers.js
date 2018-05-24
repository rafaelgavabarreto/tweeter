// "use strict";

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

const ObjectId = require('mongodb').ObjectId;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
    return {

      // Saves a tweet to `db`
      saveTweet: function(newTweet, callback) {
        try {
          db.collection('tweets').insertOne(newTweet)
        } catch (e) {
          callback(e, false);
        }
        callback(null, true);
      },

      // Get all tweets in `db`, sorted by newest first
      getTweets: function(callback) {
        db.collection("tweeet").find().sort({ created_at: -1 }).toArray(callback);

      });
  },



};