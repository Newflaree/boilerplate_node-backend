import { Router } from 'express';
import { check } from 'express-validator';
// Controllers
import {
  authLogin,
  authRegister,
  renewToken
} from '../controllers';
// Helpers
import { emailValidator } from '../../../helpers/db/users';
// Middlewares
import { validateFields } from '../../../middlewares';


/*
 * PATH: '/api/auth'
 */
const router = Router();

router.post( '/register', [
  check( 'email', 'El correo electrónico es necesario' ).isEmail(),
  check( 'email' ).custom( email => emailValidator( email ) ),
  check( 'name', 'El nombre de usuario es necesario' ).not().isEmpty(),
  check( 'password', 'La contraseña debe tener al menos 6 carácteres' ).isLength({ min: 6 }),
  validateFields
], authRegister );

router.post( '/login', [
  check( 'email', 'El correo electrónico es necesario' ).isEmail(),
  check( 'password', 'La contraseña es necesaria' ).not().isEmpty(),
  validateFields
], authLogin );

router.get( '/renew-token', renewToken );

export default router;
