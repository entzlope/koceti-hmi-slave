const relay = require('./relay.js');
const ffmpeg_rtsp = require('./ffmpeg-rtsp.js');
const ffmpeg_webrtc = require('./ffmpeg-webrtc.js');
const janus = require('./janusGateway.js');
const web = require('./webserver.js');

const relayPort = 5000;
const webPort = 8080;

// RTSP:ffmpeg_rtsp, WebRTC:ffmpeg_webrtc
var ffmpeg = ffmpeg_rtsp;

relay.start(relayPort);
ffmpeg.start();
janus.start();
web.start(webPort);

function exitHandler(options, exitCode) {
  relay.stop();
  ffmpeg.stop();
  janus.stop();
  web.stop();
  console.log(`process exited with code ${exitCode}`);
  process.exit();
}
 
['SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGCHLD', 'SIGTERM', 'unhandledException'].forEach(eventType => {
  process.on(eventType, exitHandler.bind(null, eventType));
});
