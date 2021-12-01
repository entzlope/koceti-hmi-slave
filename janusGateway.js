// Janus Gateway handler
const spawn = require('child_process').spawn;

const janusPath = '/opt/janus';

var janus = null;

var start = function() {
  janus = spawn(janusPath + '/bin/janus', [
    '-F', janusPath + '/etc/janus'
  ]);

  janus.stdout.setEncoding('utf8');
  janus.stderr.setEncoding('utf8');
  
  janus.stdout.on('data', data => console.log(data));
  janus.stderr.on('data', data => console.error(data));
  janus.on('close', exitCode => console.log(`Janus Gateway exited with code ${exitCode}`));
}

var stop = function() {
  if(janus) janus.kill();
}

module.exports.start = start;
module.exports.stop = stop;
