const { fork } = require('child_process');

class OnWithIt {
  constructor(text, debug=false) {
    this.sub = fork(`${__dirname}/logger.js`);
    this._text = text;
    this.spinner = ["⠋", "⠙", "⠚", "⠒", "⠂", "⠂", "⠒", "⠲", "⠴", "⠦", "⠖", "⠒", "⠐", "⠐", "⠒", "⠓", "⠋"];
    this.interval = 80;
    this.logs = [];
    this.debug = debug;

    process.on('SIGTERM', this.stop);
    process.on('SIGINT', this.stop);
    process.on('uncaughtException', (e) => {
      this.stop();
      process.stdout.write(`${e}\n`);
    });
  }
  start() {
    // let's send all the defaults to the sub process
    this.sendMessage({ action: 'start', text: this._text, spinner: this.spinner, interval: this.interval });
    return this;
  }
  set text(txt) {
    this._text = txt;
    this.sendMessage({ action: 'update', text: this._text });
    return this;
  }
  info(text) { return this.persist(text, "info"); }
  error(text) { return this.persist(text, "error"); }
  success(text) { return this.persist(text, "success"); }
  warn(text) { return this.persist(text, "warn"); }
  persist(text, status) {
    this.sendMessage({ action: 'persist', text, status });
    return this;
  }
  stop() {
    // In order to make sure the process has been handled wait 150ms
    setTimeout(() => {
      this.sub.kill();
    }, 150);
  }
  sendMessage(msg, callback) {
    if(this.debug) {
      this.logs.push(msg);
    }
    return new Promise((resolve, reject) => {
      this.sub.send(msg, (error) => {
        // If there is a callback make sure we call that as well as resolve the promise
        if(typeof callback == 'function') callback(error);
        if(error) return reject(error);
        return resolve();
      });
    });
  }
}

module.exports = OnWithIt;
