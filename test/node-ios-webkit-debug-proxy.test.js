'use strict';

var WebkitProxy = require('..');

describe('test', function() {
  it('should be ok', function *() {
    var proxy = new WebkitProxy();
    try {
      yield proxy.start();
      proxy.stop();
    } catch (e) {
      console.log(e);
    }
  });
});
