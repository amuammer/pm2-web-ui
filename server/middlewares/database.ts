import { IApiRequest, IApiResponse } from '../api';
import * as mongoose from 'mongoose';
import { UserModel, User } from '../models/user';

import config from '../config';

export default (fn) => {
  return async (req: IApiRequest, res: IApiResponse) => {
    return await fn(req, res);
  };
};
