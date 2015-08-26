'use strict';
/*global describe, it, beforeEach, inject, expect */

describe('MyFlapperNews controllers', function() {

  beforeEach(module('flapperApp'));
  beforeEach(module('myFlapperServices'));

  describe('MainCtrl', function() {
    var scope, ctrl,
      addPost = function(scope) {
        scope.title = 'New Post';
        scope.link = 'New Link';
        scope.addPost();
      };

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('MainCtrl', {$scope: scope});
    }));

    it('should create a "posts" model', function() {
      expect(scope.posts.length).toEqual(0);
    });

    it('should add a post', function() {
      expect(scope.posts.length).toEqual(0);
      scope.title = 'New Post';
      scope.link = 'New Link';
      scope.addPost();
      expect(scope.posts.length).toEqual(1);
      expect(scope.posts[0].title).toEqual('New Post');
      expect(scope.posts[0].link).toEqual('New Link');
    });

    it('should increment votes count when incrementer clicked', function() {
      addPost(scope);
      var post = scope.posts[0];
      expect(post.upvotes).toEqual(0);
      scope.incrementUpvotes(post);
      expect(post.upvotes).toEqual(1);
    });
  });

});
