import { request, response } from 'express';
import jwt from 'jsonwebtoken';
// Models
import { User } from '../global-models';

const validateJWT = async ( req = request, res = response, next ) => {
  const token = req.header( 'x-token' );

  if ( !token ) {
    return res.status( 401 ).json({
      ok: false,
      msg: 'There is no token in the request'
    });
  }

  try {
    const { uid } = jwt.verify( token, process.env.SERCRET_KEY );
    const user = await User.findById( uid );

    if ( !user || !user.isActive ) {
      return res.status( 401 ).json({
        ok: false,
        msg: 'Token is invalid'
      });
    }

    req.user = user;

    next();

  } catch ( err ) {
    console.log( `${ '[MIDDLEWARE.VALIDATE-JWT]'.bgRed }: ${ err }` );
    res.status( 401 ).json({
      ok: false,
      msg: 'Token is invalid'
    });
  }
}

export default validateJWT;
