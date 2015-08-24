'use strict';
/*global describe, it, beforeEach, inject, expect */

describe('MyFlapperNews controllers', function() {

  beforeEach(module('flapperApp'));

  describe('MainCtrl', function() {
    var scope, ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('MainCtrl', {$scope: scope});
    }));

    it('should create a "posts" model', function() {
      expect(scope.posts.length).toEqual(5);
    });

    it('should add a post', function() {
      expect(scope.posts.length).toEqual(5);
      scope.title = 'New Post';
      scope.link = 'New Link';
      scope.addPost();
      expect(scope.posts.length).toEqual(6);
      expect(scope.posts[5].title).toEqual('New Post');
      expect(scope.posts[5].link).toEqual('New Link');
    });

    it('should increment votes count when incrementer clicked', function() {
      var post = scope.posts[0];
      expect(post.upvotes).toEqual(5);
      scope.incrementUpvotes(post);
      expect(post.upvotes).toEqual(6);
    });
  });

});
