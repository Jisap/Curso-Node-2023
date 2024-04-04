import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 }); // Intancia de servidor de websockets escuchando conexiones websocket en el puerto 8080

wss.on('connection', function connection(ws) {   // Controlador de evento 'connection'. wss recibe todos los websocket conectados

  console.log('Client connected');

  ws.on('error', console.error);                 // Controlador de evento 'error para ws

  ws.on('message', function message(data) {      // Controlador de evento 'message' para ws que emite un mensaje
   
    const payload = JSON.stringify({
      type: 'custom-message',
      payload: data.toString(),
    })

    // Todos incluyente
    // wss.clients.forEach(function each(client){
    //   if(client.readyState === WebSocket.OPEN){
    //     client.send(payload)
    //   }
    // })

    // Todos excluyente
    wss.clients.forEach(function each(client) {                    // mapeo de los ws (clientes) que se conectaron a wss 
      if (client !== ws && client.readyState === WebSocket.OPEN) { // Si el cliente es diferente del ws que envía el mensaje
        client.send(payload);                                      // recibe el mensaje.
      }
    });

  });

  // ws.send('Hola desde el servidor');             // Se envía un mensaje al cliente 

  ws.on('close', () => {
    console.log('Client disconnect')
  })
});

console.log('Server running on port http://localhost:3000')