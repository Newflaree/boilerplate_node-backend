import { request, response } from 'express';
import { validationResult } from 'express-validator';

const validateFields = ( req = request, res = response, next ) => {
  const errors = validationResult( req )

  const customErrors = errors.errors.map( err => ({
    ok: false,
    param: err.param,
    msg: err.msg
  }));

  if ( !errors.isEmpty() ) {
    return res.status( 400 ).json( customErrors );
  }

  next();
}

export default validateFields;
