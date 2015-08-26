'use strict';
/* global angular */

var flapperNewsApp = angular.module('flapperApp', [
  'ngRoute',
  'myFlapperControllers',
  'myFlapperServices'
]);

flapperNewsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home',
        controller: 'MainCtrl',
        resolve: {
          posts: function(Post) {
            return Post.getAll();
          }
        }
      }).
      when('/posts/:id', {
        templateUrl: 'partials/posts',
        controller: 'PostsCtrl',
        resolve: {
          post: function($route, Post) {
            return Post.get($route.current.params.id);
          }
        }
      }).
      when('/login', {
        templateUrl: 'partials/login',
        controller: 'AuthCtrl',
        resolve: {
          ifLoggedIn: function(Authenticate, $location) {
            if (Authenticate.isLoggedIn()) {
              $location.path('/home');
            }
          }
        }
      }).
      when('/register', {
        templateUrl: 'partials/register',
        controller: 'AuthCtrl',
        resolve: {
          ifLoggedIn: function(Authenticate, $location) {
            if (Authenticate.isLoggedIn()) {
              $location.path('/home');
            }
          }
        }
      }).
      otherwise({
        redirectTo: '/home'
      });

  }]);
