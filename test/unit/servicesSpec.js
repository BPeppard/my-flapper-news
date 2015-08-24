/* global describe, it, beforeEach, inject, expect */

'use strict';

describe('MyFlapperNews services', function() {

  beforeEach(module('flapperApp'));

  it('should exist', inject(function(Post) {
    expect(Post).toBeDefined();
  }));

});
