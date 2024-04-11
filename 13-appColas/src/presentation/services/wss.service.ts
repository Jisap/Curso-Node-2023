import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';

interface Options {
  server: Server;
  path?: string;
}

// Patrón Singleton
// 1. Una única instancia
// 2. Acceso global
// 3. Control de creación de como y cuando se crea la instancia
// 4. lazy initialization. La instancia se crea solo cuando se solicita


export class WssService {

  private static _instance: WssService;               // Prop privada para almacenar la única instancia de WssService -> Singleton
  private wss: WebSocketServer;                       // Instancia del servidor de Websockets

  private constructor(options:Options) {
    const { server, path='/ws' } = options;
    this.wss = new WebSocketServer({ server, path }); // Se crea instancia de WebsocketServer con los parámetros de options
    this.start();                                     // Se llama al método start
  }

  static get instance():WssService{                   // Método que devuelve la única instancia de WssService
    if(!WssService._instance){
      throw 'WssService is not initialized'
    }
    return WssService._instance
  }

  static initWss( options: Options) {                 // Método para  inicializar la instancia de WssService -> constructor aplica options -> start -> wss.on
    if (WssService._instance) return;
    WssService._instance = new WssService(options)    
  }

  public start(){
    this.wss.on('connection', (ws: WebSocket) => {    // Wss escucha el evento 'connection' de un ws -> mensaje
      console.log('Client connected');
      ws.on('close', () => console.log('Client disconnected')); // Si se produce el evento 'close'  -> mensaje
    })
  }
}