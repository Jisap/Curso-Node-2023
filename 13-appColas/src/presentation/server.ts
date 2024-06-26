import express, { Router } from 'express';
import path from 'path';

interface Options {
  port: number;
  //routes: Router;
  public_path?: string;
}


export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  //private readonly routes: Router;

  constructor(options: Options) {
    const { port, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    //this.routes = routes;
    this.configure();
  }

  private configure () {

    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    //this.app.use(this.routes);

    //* SPA 
    this.app.get(/^\/(?!api).*/, (req, res) => { // Cualquier ruta que llegue a la app que no comienze por api
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`); // Construcción de la ruta del index.html 
      res.sendFile(indexPath);  // envía como respuesta a la solicitud http el archivo index.html
    });
  }

  public setRoutes (router: Router){  // Este método permite que se inicializen las rutas despues de que lo haga el wssService
    this.app.use(router)              // de esta mánera podemos trabajar en el server con wss
  }
  
  async start() {

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });

  }

  public close() {
    this.serverListener?.close();
  }

}
