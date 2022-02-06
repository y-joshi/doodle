const websocket = require("ws");

const wss = new websocket.Server({port: 8082})

const broadcast = function(data, sender) {
    wss.clients.forEach(function(client) {
      if (client !== sender) {
        client.send(data)
      }
    })
  }
  


wss.on("connection", ws => {
    console.log('new user connected...');

    ws.on('message', data => {
        console.log('got data')
        //ws.send(data)
        broadcast(data, ws);
    })

    ws.on('close', () => {
        console.log('client disconnected....');
    })

})

