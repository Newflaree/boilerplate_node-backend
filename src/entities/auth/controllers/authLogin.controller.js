import { request, response } from 'express';
// Service
import { authLoginService } from '../services';

/**
 * PATH: /api/auth/register
 * AUTH-REQUIRED: false
 * ADMIN-REQUIRED: false
 *
 * Handle a POST request to login a exists user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
const authLogin = async (
  req = request,
  res = response
) => {

  const { email, password } = req.body;

  try {
    const { statusCode, ok, logedUser, token, msg } = await authLoginService( email, password );

    res.status( statusCode ).json({
      ok,
      msg,
      logedUser,
      token
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.AUTH-LOGIN]'.bgRed }: ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}

export default authLogin;
