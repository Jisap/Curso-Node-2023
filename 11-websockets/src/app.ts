import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 }); // Intancia de servidor de websockets escuchando conexiones websocket en el puerto 8080

wss.on('connection', function connection(ws) {   // Controlador de evento 'connection' recibiendo el websocket conectado 'ws'

  console.log('Client connected');

  ws.on('error', console.error);                 // Controlador de evento 'error para ws

  ws.on('message', function message(data) {      // Controlador de evento 'message' para ws si se recibe un message
    console.log('received: %s', data);
  });

  ws.send('Hola desde el servidor');             // Se envía un mensaje al cliente 

  ws.on('close', () => {
    console.log('Client disconnect')
  })
});

console.log('Server running on port http://localhost:3000')