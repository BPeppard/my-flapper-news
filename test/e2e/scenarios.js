'use strict';
/* global describe, it, beforeEach, expect, browser, element, by */

describe('My Flapper News App', function() {

  it('should redirect index.html to index.html#/home', function() {
    browser.get('');
  });

  describe('MyFlapperNews App', function() {

    beforeEach(function() {
      browser.get('http://localhost:3000');
    });

    it('should add a post when the post button is clicked', function() {
      var postList = element.all(by.repeater('post in posts'));
      expect(postList.count()).toBe(2);

      var postTitle = element(by.model('title'));
      var addPostButton = element(by.buttonText('Post'));

      postTitle.sendKeys('Example Post');
      addPostButton.click();
      expect(postList.count()).toBe(3);
      //var post = postList.get(5);
      //expect(post.getText()).toEqual('Example Post');
    });

    it('should decrement upvotes when thumbs down is clicked', function() {
      var postList = element.all(by.repeater('post in posts'));
      var firstPost = postList.first();
      var thumbsDownButton = firstPost.element(by.css('glyphicon-thumbs-down'));
      var upvote = firstPost.element(by.binding('post.upvotes'));
      thumbsDownButton.click();
      expect(upvote).toEqual(upvote + 1);
    });

  });

});
