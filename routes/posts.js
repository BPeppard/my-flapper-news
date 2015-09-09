'use strict';

var express = require('express');
var router = express.Router(); //eslint-disable-line
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');
//var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'AWESOMESECRET', requestProperty: 'payload'});

/* finds post and sets it to req.post */
router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function(err, post) {
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }
    req.post = post;
    return next();
  });
});

router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function(err, comment) {
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }
    req.comment = comment;
    return next();
  });
});

router.get('/', function(req, res, next) {
  Post.find(function(err, posts) {
    if (err) {
      return next(err);
    }
    res.json(posts);
  });
});

router.get('/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }
    res.json(post);
  });
});

router.post('/', auth, function(req, res, next) {
  console.log('Creating post');
  console.log('req: ');
  console.log(req);
  console.log('payload: ');
  console.log(req.payload);
  var post = new Post(req.body);
  post.author = req.payload.username;
  post.save(function(err, post) {
    if (err) { return next(err); }
    res.json(post);
  });
});

router.post('/:post/comments', auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;
  comment.author = req.payload.username;

  comment.save(function(err, comment) {
    if (err) { return next(err); }
    req.post.comments.push(comment);
    req.post.save(function(err) {
      if (err) { return next(err); }
      res.json(comment);
    });
  });
});

router.put('/:post/upvote', auth, function(req, res, next) {
  var username = req.payload.username;
  User.findOne({'username': username}, function(err, user) {
    if (err) { return next(err); }
    console.log('Checking voting on ' + req.post._id);
    if (user.canVote(req.post._id)) {
        req.post.upvote(function(err, post) {
          if (err) { return next(err); }
          user.addVote(post._id, function() {
            res.json(post);
          });
        });
    } else {
      return next(new Error('User already voted!'));
    }
  });
});

router.put('/:post/downvote', auth, function(req, res, next) {
  var username = req.payload.username;
  User.findOne({'username': username}, function(err, user) {
    if (err) { return next(err); }
    console.log('Checking voting on ' + req.post._id);
    if (user.canVote(req.post._id)) {
        req.post.downvote(function(err, post) {
          if (err) { return next(err); }
          user.addVote(post._id, function() {
            res.json(post);
          });
        });
    } else {
      return next(new Error('User already voted!'));
    }
  });
});

router.put('/:post/comments/:comment/upvote', auth, function(req, res, next) {
  var username = req.payload.username;
  User.findOne({'username': username}, function(err, user) {
    if (err) { return next(err); }
    console.log('Checking voting on ' + req.comment._id);
    if (user.canVote(req.comment._id)) {
        req.comment.upvote(function(err, comment) {
          if (err) { return next(err); }
          user.addVote(comment._id, function() {
            res.json(comment);
          });
        });
    } else {
      return next(new Error('User already voted!'));
    }
  });
});

router.put('/:post/comments/:comment/downvote', auth, function(req, res, next) {
  var username = req.payload.username;
  User.findOne({'username': username}, function(err, user) {
    if (err) { return next(err); }
    console.log('Checking voting on ' + req.comment._id);
    if (user.canVote(req.comment._id)) {
        req.comment.downvote(function(err, comment) {
          if (err) { return next(err); }
          user.addVote(comment._id, function() {
            res.json(comment);
          });
        });
    } else {
      return next(new Error('User already voted!'));
    }
  });
});

module.exports = router;
