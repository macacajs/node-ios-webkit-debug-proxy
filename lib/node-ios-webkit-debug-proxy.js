'use strict';

const EventEmitter = require('events');
const childProcess = require('child_process');

const _ = require('./helper');

const IOS_WEBKIT_DEBUG_PROXY = 'ios_webkit_debug_proxy';

class WebkitProxy extends EventEmitter {

  constructor(options) {
    super();
    this.args = null;
    this.proxy = null;
    this.binPath = null;
    Object.assign(this, {
    }, options || {});
  }

  *start(args) {
    try {
      yield this.killAll();
    } catch (e) {
      //console.log(e);
    }

    this.args = args || {};

    try {
      this.binPath = yield _.exec(`which ${IOS_WEBKIT_DEBUG_PROXY}`);
    } catch (err) {
      console.log(err);
    }

    if (!this.binPath) {
      throw Error(`${IOS_WEBKIT_DEBUG_PROXY} not found, please install.`);
    }

    if (_.isExistedFile(this.binPath)) {
      console.log(`${IOS_WEBKIT_DEBUG_PROXY} path: ${this.binPath}`);
      yield this.startProxy();
    } else {
      throw Error(`${IOS_WEBKIT_DEBUG_PROXY} not found, please install.`);
    }
  }

  startProxy() {
    var proc = childProcess.spawn(this.binPath, [], {
      env: process.env,
      path: process.cwd()
    });
    this.proxy = proc;

    proc.stderr.setEncoding('utf8');
    proc.stdout.setEncoding('utf8');
    return new Promise((resolve, reject) => {
      proc.stdout.on('data', data => {
        console.log(data);
      });

      proc.stderr.on('data', data => {
        console.log(data);
      });

      proc.stdout.on('error', err => {
        console.log(`${IOS_WEBKIT_DEBUG_PROXY} error with ${err}`);
      });

      proc.on('exit', (code, signal) => {
        console.log(`${IOS_WEBKIT_DEBUG_PROXY} exit with code: ${code}, signal: ${signal}`);
        reject();
      });

      return _.sleep(1000).then(resolve);
    });
  }

  stop() {
    if (this.proxy) {
      this.proxy.kill();
    }
  }

  *killAll() {
    return _.exec(`killAll ${IOS_WEBKIT_DEBUG_PROXY}`);
  }
}

module.exports = WebkitProxy;
