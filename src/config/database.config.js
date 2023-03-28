import mongoose from 'mongoose';


const dbConnection = async () => {
  try {
    await mongoose.connect( process.env.MONGO_CNN || '' );
    console.log( `${ '[CONFIG.DATABASE]'.bgGreen }: DataBase ${ 'ONLINE'.green }` );

  } catch ( err ) {
    console.log( `${ '[CONFIG.DATABASE]'.bgRed }: ${ err }` );
  }
}

export default dbConnection;
