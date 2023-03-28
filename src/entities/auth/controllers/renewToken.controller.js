import { request, response } from 'express';

/*
 * PATH: /api/auth/register
 * AUTH-REQUIRED: true
 * ADMIN-REQUIRED: false
 */
const renewToken = async (
  req = request,
  res = response
) => {

  try {
    res.json({
      ok: true,
      msg: 'renewToken'
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.RENEW-TOKEN]'.bgRed }: ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}

export default renewToken;
