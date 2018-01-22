# onwithit

> 🚀 a threaded progression logger

The purpose of `onwithit` is to be able to make logging to the stdout threaded. The current logging approach is dependent on the main thread which will make updating animations or text being displayed to the user seem stalled. The simplest of all animations is a loading or spinner animation that the user could encounter during a long running task.

[![Build Status](https://travis-ci.org/gabrielcsapo/onwithit.svg?branch=master)](https://travis-ci.org/gabrielcsapo/onwithit)
[![Dependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/onwithit/status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/onwithit)
[![devDependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/onwithit/dev-status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/onwithit#info=devDependencies)
[![Coverage Status](https://lcov-server.gabrielcsapo.com/badge/github%2Ecom/gabrielcsapo/onwithit.svg)](https://lcov-server.gabrielcsapo.com/coverage/github%2Ecom/gabrielcsapo/onwithit)
[![npm](https://img.shields.io/npm/dt/onwithit.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/dm/onwithit.svg?maxAge=2592000)]()

## Installation

```
npm install onwithit --save
```

## Usage

```js
function wait(time) {
  var now = Date.now();
  while(Date.now() < now + time){}
}
const OnWithIt = require('onwithit');

const program = new OnWithIt("Building something cool").start();
wait(500);
program.text = "Building phase 1";
wait(500);
program.info("Phase 1 built");
program.text = "Building phase 2";
wait(500);
program.success("Phase 2 built");
program.stop();
```

## Thanks

The interface for `onwithit` has taken cues from the greats, [ora](https://github.com/sindresorhus/ora) is a great library and has been used in a ton of my projects.
