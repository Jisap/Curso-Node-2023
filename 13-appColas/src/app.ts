import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WssService } from './presentation/services/wss.service';


(async()=> {
  main();
})();


function main() {

  const server = new Server({ // Instancia de servidor de express
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  // Tenemos un servidor de express para peticiones http que implementa un servicio de websockets.
  // El servidor HTTP creado con Express puede manejar tanto las solicitudes HTTP regulares como las conexiones WebSocket.
  // Los websockets se inician con un handshake http y esto inicia el cambio de protocolo de servidor de http a ws

  const httpServer = createServer( server.app );  // Servidor de peticiones http basado en el server de express
  WssService.initWss({ server: httpServer })      // Se inicia el servicio de websockets basado en el server de http

  httpServer.listen(envs.PORT, () => {
    console.log(`Server running on port: ${envs.PORT}`)

  })
}