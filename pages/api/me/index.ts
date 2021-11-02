import { IApiRequest, IApiResponse } from '../../../server/api';
import { database, session, method, authenticate, combine } from '../../../server/middlewares';

const onRequest = async (req: IApiRequest, res: IApiResponse) => {
  console.log("req.user", req.user);

  const user = req.user ? req.user : null;
  res.status(200).json({ user });
};

export default combine(method('GET'), database, session, authenticate(), onRequest);
