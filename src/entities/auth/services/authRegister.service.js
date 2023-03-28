import bcrypt from 'bcryptjs';
// Models
import { User } from '../../../global-models';
// Helpers
import { generateJWT } from '../../../helpers/jwt';

/*
 /**
 * Register a new user.
 *
 * @param {string} email - The user's email.
 * @param {string} name - The user's name.
 * @param {string} password - The user's password.
 * @returns {Object} An object containing the new user and a JWT.
 * @throws {Error} Throws an error if there is an issue creating the new user or generating a JWT.
 */
const authRegisterService = async ( email, name, password ) => {
  try {
    const newUser = await createUser( email, name, password );
    const token = await generateToken( newUser._id );

    return {
      newUser,
      token
    };

  } catch (error) {
    console.error( `${ '[SERVICE.AUTH-REGISTER]'.bgRed }: ${ error }`);
    throw error;
  }
};

/**
 * Create a new user and save to the database.
 *
 * @param {string} email - The user's email.
 * @param {string} name - The user's name.
 * @param {string} password - The user's password.
 * @returns {Object} The new user object.
 * @throws {Error} Throws an error if there is an issue creating the new user.
 */
const createUser = async ( email, name, password ) => {
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync( password, salt );
  const user = new User({ email, name, password: hashedPassword });

  try {
    return await user.save();

  } catch (error) {
    console.error( `${ '[SERVICE.AUTH-REGISTER]'.bgRed }: ${ error }`);
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
const generateToken = async (userId) => {
  try {
    return await generateJWT(userId);

  } catch (error) {
    console.error( `${ '[SERVICE.AUTH-REGISTER]'.bgRed }: ${ error }`);
    throw error;
  }
};

export default authRegisterService;
