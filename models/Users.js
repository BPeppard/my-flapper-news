'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  hash: String,
  salt: String,
  votes: [String]
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, 'AWESOMESECRET');
};

UserSchema.methods.addVote = function(id, callback) {
  this.votes.push(id);
  this.save(callback);
};

UserSchema.methods.canVote = function(id) {
  console.log('canVote: checking for ' + id);
  console.log(this.votes);
  if (this.votes.indexOf(id) >= 0) {
    return false;
  } else {
    return true;
  }
};

mongoose.model('User', UserSchema);
