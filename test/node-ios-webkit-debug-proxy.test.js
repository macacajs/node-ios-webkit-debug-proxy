/* ================================================================
 * node-ios-webkit-debug-proxy by xdf(xudafeng[at]126.com)
 *
 * first created at : Wed Mar 02 2016 14:20:50 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var WebkitProxy = require('..');

describe('test', function() {
  it('should be ok', function *(done) {
    var proxy = new WebkitProxy();
    try {
      yield proxy.start();
      proxy.stop();
    } catch (e) {
      console.log(e);
    }
    done();
  });
});
