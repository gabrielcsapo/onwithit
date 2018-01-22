const test = require('tape');

const OnWithIt = require('../');

test('@onwithit', (t) => {
  t.plan(2);

  t.test('should be able to instance itself', (t) => {
    let progress = new OnWithIt('Building something cool');
    t.equal(progress.sub.constructor.name, 'ChildProcess');
    progress.stop();
    t.end();
  });

  t.test('should be able to start a spinner and update the main process', (t) => {
    let progress = new OnWithIt('Building something cool', true).start();
    progress.text = "hi";
    progress.success('We built it');
    progress.stop();
    t.deepEqual(progress.logs, [{
      action: 'start',
      text: 'Building something cool',
      spinner: ['⠋',
        '⠙',
        '⠚',
        '⠒',
        '⠂',
        '⠂',
        '⠒',
        '⠲',
        '⠴',
        '⠦',
        '⠖',
        '⠒',
        '⠐',
        '⠐',
        '⠒',
        '⠓',
        '⠋'
      ],
      interval: 80
    },
    {
      action: 'update',
      text: 'hi'
    },
    {
      action: 'persist',
      text: 'We built it',
      status: 'success'
    }
    ]);
    t.end();
  });

});
