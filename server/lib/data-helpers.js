"use strict";

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

const ObjectId = require('mongodb').ObjectId;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      console.log(newTweet);
      // try {
      //   db.collection('tweets').insertOne(newTweet)
      // } catch (e) {
      //   callback(e, false);
      // }
      // callback(null, true);
              db.collection("tweets").insertOne(newTweet);
        callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {

      db.collection("tweets").find().toArray(callback);

      console.log(db.collection('tweets').find());
      // db.collection("tweets").find().sort({ created_at: -1 }).toArray(callback);
      // db.collection('tweets').find().toArray((err, tweets) => {
      //   const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      //   callback(null, tweets.sort(sortNewestFirst));
      // });
    },
  };
}