'use strict';

/* global angular */

var myFlapperControllers = angular.module('myFlapperControllers', []);

myFlapperControllers.controller('MainCtrl', ['$scope', 'Post', 'Authenticate', function($scope, Post, Authenticate) {
  $scope.showNewPost = false;
  $scope.posts = Post.posts;
  $scope.isLoggedIn = Authenticate.isLoggedIn;
  $scope.addPost = function() {
    if (!$scope.title || $scope.title === '') {
      return;
    }
    Post.create({
      title: $scope.title,
      link: $scope.link
    });
    $scope.title = '';
    $scope.link = '';
  };
  $scope.incrementUpvotes = function(post) {
    Post.upvote(post);
  };
  $scope.decrementUpvotes = function(post) {
    Post.downvote(post);
  };
  $scope.toggleNewPost = function() {
    $scope.showNewPost = !$scope.showNewPost;
  };
}]);

myFlapperControllers.controller('PostsCtrl', [
  '$scope',
  '$routeParams',
  'Post',
  'post',
  'Authenticate',
  function($scope, $routeParams, Post, post, Authenticate) {
    //$scope.post = Post.posts[$routeParams.id];
    $scope.showNewComment = false;
    $scope.post = post;
    $scope.isLoggedIn = Authenticate.isLoggedIn;
    $scope.addComment = function() {
      if ($scope.body === '') {
        return;
      }
      Post.addComment(post._id, {
        body: $scope.body,
        author: 'user'
      }).then(function(response) {
        var comment = response.data;
        $scope.post.comments.push(comment);
      });
      $scope.body = '';
    };
    $scope.incrementUpvotes = function (comment) {
      Post.upvoteComment(post, comment);
    };
    $scope.decrementUpvotes = function(comment) {
      Post.downvoteComment(post, comment);
    };
    $scope.toggleNewComment = function() {
      $scope.showNewComment = !$scope.showNewComment;
    };
  }]);

myFlapperControllers.controller('AuthCtrl', [
  '$scope',
  '$location',
  'Authenticate',
  function($scope, $location, Authenticate) {
      $scope.user = {};
      $scope.register = function() {
        Authenticate.register($scope.user).error(function(error) {
          $scope.error = error;
        }).then(function() {
          $location.path('/home');
        });
      };
      $scope.logIn = function() {
        Authenticate.logIn($scope.user).error(function(error ) {
          $scope.error = error;
        }).then(function() {
          $location.path('/home');
        });
      };
  }]);

myFlapperControllers.controller('NavCtrl', [
  '$scope',
  'Authenticate',
  function($scope, Authenticate) {
      $scope.isLoggedIn = Authenticate.isLoggedIn;
      $scope.currentUser = Authenticate.currentUser;
      $scope.logOut = Authenticate.logOut;
  }]);
