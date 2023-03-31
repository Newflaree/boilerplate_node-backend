import { request, response } from 'express';
// Services
import { authRegisterService } from '../services';

/**
 * PATH: /api/auth/register
 * AUTH-REQUIRED: false
 * ADMIN-REQUIRED: false
 *
 * Handle a POST request to register a new user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
const authRegister = async (
  req = request,
  res = response
) => {

  const { email, name, password } = req.body;

  try {
    const { newUser, token } = await authRegisterService( email, name, password );

    res.status(201).json({
      ok: true,
      newUser,
      token
    });

  } catch (error) {
    console.log( `${ '[CONTROLLER.AUTH-REGISTER]'.bgRed }: ${ error }` );
    res.status(500).json({
      ok: false,
      error: 'Could not create new user. Talking the Admin'
    });
  } 
}

export default authRegister;
