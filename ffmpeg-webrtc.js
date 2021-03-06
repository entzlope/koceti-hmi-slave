// FFmpeg Encoder handler
const spawn = require('child_process').spawn;

// ffmpeg -f v4l2 -s 3840x1080 -input_format mjpeg -re -i /dev/video0 -c:v libvpx -b:v 0 -crf 31 -deadline realtime -an -s 3840x1080 -threads 16 -f rtp rtp://localhost:8000
const videoDriver = 'v4l2';
const inputWidth = 3840;
const inputHeight = 1080;
const inputFormat = 'mjpeg';
const inputDevice = '/dev/video0';

const outputCodec = 'libvpx';
const outputBitrate = 0 + '';
const outputCrf = 31 + '';
const outputDeadline = 'realtime';
const outputRate = 30 + '';
const outputSizeRatio = 1; // n:1 (ex: 3=3:1, input 3840x1080 -> output 1280x360)
const threadCount = 16 + '';

const fileType = 'rtp';
const fileName = 'rtp://localhost:8000';

var ffmpeg = null;

var start = function() {
  ffmpeg = spawn('ffmpeg', [
    '-f', videoDriver,
    '-s', inputWidth + 'x' + inputHeight,
    '-input_format', inputFormat,
    '-re',
    '-i', inputDevice,
    
    '-c:v', outputCodec,
    '-b:v', outputBitrate,
    '-crf', outputCrf,
    '-deadline', outputDeadline,
    '-an',
    //'-r', (outputRate + ''),
    '-s', parseInt(inputWidth/outputSizeRatio) + 'x' + parseInt(inputHeight/outputSizeRatio),
    '-threads', threadCount,
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
