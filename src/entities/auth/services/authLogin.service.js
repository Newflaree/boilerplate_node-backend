import bcrypt from 'bcryptjs';
// Helpers
import { generateJWT } from '../../../helpers/jwt';
// Models
import { User } from '../../../global-models';

/**
 * Login service for authenticating user and returning JWT token
 *
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {object} - An object containing the authentication status and JWT token
 */
const authLoginService = async (
  email = '',
  password = ''
) => {
  try {
    const logedUser = await authenticateUser( email, password );
    const token = await generateToken( logedUser._id );

    return {
      statusCode: 200,
      ok: true,
      logedUser,
      token,
    };

  } catch ( error ) {
    return handleError( error )
  }
};

/**
 * Authenticate user and generate JWT token
 *
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {object} - An object containing the authentication status and JWT token
 */
const authenticateUser = async (
  email,
  password
) => {
  const errorMsg = 'Correo electrónico o contraseña incorrentos';

  try {
    // Check if user with email exists
    const logedUser = await User.findOne({ email });
    if ( !logedUser || !logedUser.isActive ) {
      throw new Error( errorMsg );
    }

    // Compare user's password with stored hashed password
    const isPasswordValid = await bcrypt.compare( password, logedUser.password );
    if ( !isPasswordValid ) {
      throw new Error( errorMsg );
    }

    return logedUser;

  } catch ( error ) {
    console.error( `${ '[SERVICE.AUTH-LOGIN]'.bgRed }: ${ error }`);
    throw error;
  }
};

/**
 * Generate a JWT for a given user ID.
 *
 * @param {string} userId - The user ID to generate the JWT for.
 * @returns {string} A JWT for the given user ID.
 * @throws {Error} Throws an error if there is an issue generating the JWT.
 */
const generateToken = async ( userId ) => {
  try {
    return await generateJWT( userId );

  } catch ( error ) {
    console.error( `${ '[SERVICE.AUTH-LOGIN]'.bgRed }: ${ error }`);
    throw error;
  }
};

/**
 *
 * Handle errors and return HTTP response
 * @param {Error} error - The error to handle
 * @returns {object} - An object containing the HTTP response
 */
const handleError = ( error ) => {
  console.error( `${ '[SERVICE.AUTH-LOGIN]'.bgRed }: ${ error }`);

  return {
    statusCode: 401,
    ok: false,
    msg: error.message,
  };
};


export default authLoginService;
