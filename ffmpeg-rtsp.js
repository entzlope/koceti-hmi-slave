// FFmpeg Encoder handler
const spawn = require('child_process').spawn;

const videoDriver = 'v4l2';
const inputWidth = 3840;
const inputHeight = 1080;
const inputFormat = 'mjpeg';
const inputDevice = '/dev/video0';

const outputCodec = 'h264';
const bufSize = '1M';
const h264Preset = 'ultrafast';
const h264Tune = 'zerolatency';
const outputRate = 30;
const outputSizeRatio = 1; // n:1 (ex: 3=3:1, input 3840x1080 -> output 1280x360)
const fileType = 'rtsp';
const fileName = 'rtsp://localhost:8554/webcam';

var ffmpeg = null;

var start = function() {
  ffmpeg = spawn('ffmpeg', [
    '-f', videoDriver,
    '-s', inputWidth + 'x' + inputHeight,
    '-input_format', inputFormat,
    '-re',
    '-i', inputDevice,
    
    '-c:v', outputCodec,
    '-an',
    '-bufsize', bufSize,
    '-preset', h264Preset,
    '-tune', h264Tune,
    '-r', (outputRate + ''),
    '-s', parseInt(inputWidth/outputSizeRatio) + 'x' + parseInt(inputHeight/outputSizeRatio),
    '-f', fileType,
    fileName
  ]);
  
  ffmpeg.stdout.setEncoding('utf8');
  ffmpeg.stderr.setEncoding('utf8');
  
  ffmpeg.stdout.on('data', data => console.log(data));
  ffmpeg.stderr.on('data', data => console.error(data));
  ffmpeg.on('close', exitCode => console.log(`FFmpeg Encoder exited with code ${exitCode}`));
}

var stop = function() {
  if(ffmpeg) ffmpeg.kill();
}

module.exports.start = start;
module.exports.stop = stop;
