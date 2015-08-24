'use strict';

/* global angular */

var myFlapperControllers = angular.module('myFlapperControllers', []);

myFlapperControllers.controller('MainCtrl', ['$scope', 'Post', function($scope, Post) {
  $scope.posts = Post.posts;
  $scope.addPost = function() {
    if (!$scope.title || $scope.title === '') {
      return;
    }
    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0
    });
    $scope.title = '';
    $scope.link = '';
  };
  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  };
}]);
