'use strict';
/*global describe, it, beforeEach, inject, expect, jasmine */

describe('MyFlapperNews controllers', function() {

  beforeEach(function() {
      module('flapperApp');
      module(function($provide) {
        $provide.service('postSvc', function() {
          this.posts = [];
          this.getAll = jasmine.createSpy('getAll').and.callFake(function() {
            /*eslint-disable */
            return [{
              "_id":"test1",
              "title":"Test Post 1",
              "link":"http://test.post1.com",
              "comments":["55ddb5a97a22c23c20063fd1"],
              "upvotes":0
            },{
              "_id":"test2",
              "title":"Test Post 2",
              "link":"http://test.post2.com",
              "comments":["55de255994e45a082247f73d"],
              "upvotes":0
            }];
          });
          this.create = jasmine.createSpy('create');
          this.upvote = jasmine.createSpy('upvote');
          this.downvote = jasmine.createSpy('downvote');
          this.addComment = jasmine.createSpy('addComment').and.callFake(function(){
            return {
              "__v":0,
              "post":{
                "_id":"55de254e94e45a082247f73c",
                "title":"b",
                "link":"c",
                "__v":2,
                "comments":[
                  "55de255994e45a082247f73d",
                  "55e9fe9bf8ff5efc1f89a0f4"
                ],
                "upvotes":4
              },
              "body":"another cool comment",
              "author":"fakeuser",
              "_id":"55e9fe9bf8ff5efc1f89a0f4",
              "upvotes":0
            };
          });
          /*eslint-enable */
        });
      });
  });
  /* trying to mock this service */
  //beforeEach(module('myFlapperServices'));


  describe('MainCtrl', function() {
    var scope, ctrl, mockPostSvc,
    post = {
      title: 'Test Post',
      link: 'http://www.test.com',
      upvotes: 0
    };

    beforeEach(inject(function($rootScope, $controller, postSvc) {
      scope = $rootScope.$new();
      ctrl = $controller('MainCtrl', {$scope: scope, Post: postSvc});
      mockPostSvc = postSvc;
    }));

    describe('when adding a post', function() {
      it('should fail if there is no title', function() {
        scope.title = '';
        scope.link = 'New Link';
        scope.addPost();
        expect(mockPostSvc.create).not.toHaveBeenCalled();
      });
      it('should create a post if there is a title', function() {
        scope.title = 'New Post';
        scope.link = 'New Link';
        scope.addPost();
        expect(mockPostSvc.create).toHaveBeenCalled();
      });
    });

    it('should increment votes count when incrementer clicked', function() {
      scope.incrementUpvotes(post);
      expect(mockPostSvc.upvote).toHaveBeenCalled();
    });

    it('should call the service to decrement the count when clicked', function() {
      scope.decrementUpvotes(post);
      expect(mockPostSvc.downvote).toHaveBeenCalled();
    });
  });

  describe('Post Controller', function() {
    var scope, ctrl, mockPostSvc,
    post = {
      _id: 'testPost1',
      title: 'Test Post',
      link: 'http://www.test.com',
      upvotes: 0
    };

    beforeEach(inject(function($rootScope, $controller, postSvc) {
      scope = $rootScope.$new();
      ctrl = $controller('PostsCtrl', {$scope: scope, Post: postSvc, post: post});
      mockPostSvc = postSvc;
    }));

    describe('when adding a new comment', function() {
      it('should not create a comment if the comment is empty', function() {
        scope.body = '';
        scope.addComment();
        expect(mockPostSvc.addComment).not.toHaveBeenCalled();
      });
      it('should create a comment if the comment has data', function() {
        scope.body = 'This is an awesome comment';
        scope.addComment();
        expect(mockPostSvc.addComment).toHaveBeenCalled();
      });
    });
  });

});
