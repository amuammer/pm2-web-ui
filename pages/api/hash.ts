import { IApiRequest, IApiResponse } from '../../server/api';
import { UserModel, User } from '../../server/models/user';
import { database, session, authenticate, method, combine, RequestError } from '../../server/middlewares';
import * as validate from '../../shared/validation';

const hashPassword = async (req: IApiRequest, res: IApiResponse) => {
  const password = req.query.password.toString();

  if (!password) {
    throw new RequestError('password query required!', 400);
  }

  const hash = await User.hash(password);

  res.status(200).send({ hash });
};

export default combine(method('GET'), database, session, authenticate(), hashPassword);
