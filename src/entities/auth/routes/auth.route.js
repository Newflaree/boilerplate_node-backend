import { Router } from 'express';
import { check } from 'express-validator';
// Controllers
import {
  authLogin,
  authRegister,
  renewToken
} from '../controllers';


/*
 * PATH: '/api/auth'
 */
const router = Router();

router.post( '/register', authRegister );
router.post( '/login', authLogin );
router.get( '/renew-token', renewToken );

export default router;
