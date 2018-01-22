const OnWithIt = require('./');

function wait(time) {
  var now = new Date().getTime();
  while(new Date().getTime() < now + time){
    // do nothing
  }
}

const program = new OnWithIt("Building something cool").start();
wait(1000);
program.text = "Building phase 1";
wait(1000);
program.info("Phase 1 built");
program.text = "Building phase 2";
wait(1000);
program.success("Phase 2 built");
program.text = "Building phase 3";
wait(1000);
program.warn("Phase 3 built, but encountered errors");
program.stop();
