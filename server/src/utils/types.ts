import type {
  errorResponseType,
  successResponseType,
} from '../middleware/responseHandler';
import { type UserType } from './session';

export type App = {
  Variables: {
    success: successResponseType;
    error: errorResponseType;
    session: UserType;
  };
};
