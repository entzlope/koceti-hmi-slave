// Relay server by Websocket handler
const websocket = require('ws');

var server = null;

var start = function(port) {
  server = new websocket.Server({ port: port });

  server.on('connection', ws => {
    console.log('client connected');

    ws.on('message', (data, isBinary) => {
      server.clients.forEach(client => {
        if(client !== ws && client.readyState === websocket.OPEN) {
          client.send(data, { binary: isBinary });
        }
      });
    });

    ws.on('close', () => console.log('client disconnected'));
  });
}

var stop = function() {
  if(server == null) return;
  
  server.clients.forEach(client => {
    // soft close first
    client.close();

    // wait one tick and shutdown
    process.nextTick(() => {
      if([client.OPEN, client.CLOSING].includes(client.readyState)) {
        // socket still hangs, hard close
        client.terminate();
      }
    });
  });
}

module.exports.start = start;
module.exports.stop = stop;
