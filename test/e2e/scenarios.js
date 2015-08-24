'use strict';
/* global describe, it, beforeEach, expect, browser, element, by */

beforeEach(function() {
  browser.get('http://localhost:3000');
});

describe('MyFlapperNews App', function() {

  it('should add a post when the post button is clicked', function() {
    var postList = element.all(by.repeater('post in posts'));
    expect(postList.count()).toBe(5);

    var postTitle = element(by.model('title'));
    var addPostButton = element(by.buttonText('Post'));

    postTitle.sendKeys('Example Post');
    addPostButton.click();
    expect(postList.count()).toBe(6);
    //var post = postList.get(5);
    //expect(post.getText()).toEqual('Example Post');
  });

});
