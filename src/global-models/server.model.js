// Express 
import express from 'express';
// Cors
import cors from 'cors';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3001';

    // DB Connection
    // Initial methods
    this.middlewares();
  }

  middlewares() {
    this.app.use( cors() );
    this.app.use( express.json() );
  }

  routes() {
    throw new Error( 'Method not implemented yet' )
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
