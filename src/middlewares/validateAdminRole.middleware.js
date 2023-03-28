import { request, response } from 'express';

const validateAdminRole = ( req = request, res = response, next ) => {
  if ( !req.user ) {
    return res.status( 401 ).json({
      ok: false,
      msg: 'You want to varify the role without validate token before'
    });
  }

  const { role, name } = req.user;
  
  try {
    if ( role !== 'ADMIN_ROLE' ) {
      return res.status( 401 ).json({
        ok: false,
        msg: `El usuaro ${ name } no es administrador`
      });
    }

    next();

  } catch ( err ) {
    console.log( `${ '[MIDDLEWARE.VALIDATE-ADMIN-ROLE]'.bgRed }: ${ err }` );
    res.status( 401 ).json({
      ok: false,
      msg: 'Token is invalid'
    });
  }
}

export default validateAdminRole;
