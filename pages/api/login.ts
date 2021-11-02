import { IApiRequest, IApiResponse } from '../../server/api';
import { UserModel, User } from '../../server/models/user';
import { database, session, method, combine, RequestError } from '../../server/middlewares';
import * as validate from '../../shared/validation';

const login = async (req: IApiRequest, res: IApiResponse) => {
  const { username, password } = req.body;

  const [userData] = await UserModel.findByUsername(username);

  console.log("userData",userData);

  if (!userData) {
    throw new RequestError('user notfound!', 400);
  }

  const hash = userData.PASSWORD;

  if (!hash) {
    throw new RequestError('user has an empty password!', 400);
  }

  const isValidPassword = await User.isValidPassword(password, hash);

  if (!isValidPassword) {
    throw new RequestError('password incorrect!', 400);
  }

  const user = new User(userData);

  req.session.username = (user).username;
  res.status(200).json(user.getPublicData());
};

export default combine(method('POST'), database, session, login);
