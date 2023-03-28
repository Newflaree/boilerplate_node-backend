import { request, response } from 'express';
import { validationResult } from 'express-validator';

const validateFields = ( req = request, res = response, next ) => {
  const errors = validationResult( req )
  console.log( errors );

  if ( !errors.isEmpty() ) {
    return res.status( 400 ).json( errors );
  }

  next();
}

export default validateFields;
