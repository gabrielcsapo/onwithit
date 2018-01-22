const symbols = {
  info: 'ℹ',
  success: '✔',
  warn: '⚠',
  error: '✖'
};

let state = {
  action: '',
  interval: 80,
  tick: 0,
  text: '',
  loop: '',
  spinner: []
};

function createLoop(state) {
  let { text, tick, interval, spinner } = state;
  return setInterval(() => {
    tick = (tick > spinner.length - 1) ? 0 : tick;
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    // TODO: This needs to understand what line it is on and not write over any other line
    process.stdout.write(`${spinner[tick]} ${text}`);
    state.tick += tick;
  }, interval);
}

process.on('message', (msg) => {
  // let's merge in the msg object to the state which will keep the tick value and anything that needs to be stateful
  state = Object.assign(state, msg);
  let { action, loop, status='success', text } = state;

  switch(action) {
  case 'persist':
    clearInterval(loop);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`${symbols[status]} ${text}\n`);
    break;
  case 'update':
  case 'start':
    clearInterval(loop);
    state.loop = createLoop(state);
    break;
  }
});

process.on('disconnect',function() {
  process.kill();
});
