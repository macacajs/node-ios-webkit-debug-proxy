'use strict';

const util = require('xutil');
const childProcess = require('child_process');

var _ = util.merge({}, util);

_.exec = function(cmd, opts) {
  return new Promise((resolve, reject) => {
    childProcess.exec(cmd, _.merge({
      maxBuffer: 1024 * 512,
      wrapArgs: false
    }, opts || {}), (err, stdout) => {
      if (err) {
        return reject(err);
      }
      resolve(_.trim(stdout));
    });
  });
};

_.sleep = function(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
};

module.exports = _;
