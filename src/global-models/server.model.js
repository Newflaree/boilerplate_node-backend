class Server {
  constructor() {
    this.port = process.env.PORT || '3001';
  }

  listen() {
    console.log( `Listening on port ${ this.port.green }` );
  }
}

export default Server;
