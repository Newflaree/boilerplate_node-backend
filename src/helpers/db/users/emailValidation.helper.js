// Models
import { User} from '../../../global-models';

const emailValidator = async ( email = '' ) => {
  const emailExists = await User.findOne({ email });

  if ( emailExists ) {
    throw new Error( 'Ya existe un usuario con ese email' );
  }

  return true;
}

export default emailValidator;
