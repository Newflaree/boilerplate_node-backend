// Express 
import express from 'express';
// Cors
import cors from 'cors';
// Configs
import { dbConnection } from '../config';
// Routes
import { authRoutes } from '../entities/auth';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3001';
    this.apiPaths = {
      auth: '/api/auth'
    }

    // DB Connection
    this.dbConnect();
    // Initial methods
    this.middlewares();
    this.routes();
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares() {
    this.app.use( cors() );
    this.app.use( express.json() );
  }

  routes() {
    this.app.use( this.apiPaths.auth, authRoutes );
  }

  listen() {
    this.app.listen( this.port, () => {
      console.clear();

      try {
        console.log( `${ '[SERVER.LISTEN]'.bgGreen }: Server listening on port ${ this.port.green }` );
      } catch ( err ) {
        console.log( `${ '[SERVER.LISTEN]'.bgRed }: ${ err }` );
      }
    });
  }
}

export default Server;
