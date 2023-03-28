import { Router } from 'express';
import { check } from 'express-validator';


/*
 * PATH: '/api/auth'
 */
const router = Router();

router.post( '/register' );
router.post( '/login' );
router.get( '/renew-token' );

export default router;
