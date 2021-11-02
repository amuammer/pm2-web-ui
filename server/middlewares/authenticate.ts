import { IApiRequest, IApiResponse } from '../api';
import { UserModel, User } from '../models/user';

export default () => (fn) => {
  return async (req: IApiRequest, res: IApiResponse) => {

    console.log("authenticate middleware");


    if (!req.session.username) {
      req.user = null;

      res.status(403).send('');
      return;
    }

    const [userData] = await UserModel.findByUsername(req.session.username);

    if (!userData) return res.status(403).send('');

    req.user = new User(userData).getPublicData() as User;

    console.log("authenticate -> user", req.user);


    return await fn(req, res);
  };
};
