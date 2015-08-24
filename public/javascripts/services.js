'use strict';
/* global angular */

var myFlapperServices = angular.module('myFlapperServices', []);

myFlapperServices.factory('Post', [function() {
  return {
    posts: []
  };
}]);
