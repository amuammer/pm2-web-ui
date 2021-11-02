import { NextApiRequest, NextApiResponse } from 'next';
import { User } from './models/user';

export interface ISession {
  username?: string;
};

export interface IApiRequest extends NextApiRequest {
  session: ISession;
  user?: User;
};

export interface IApiResponse extends NextApiResponse {};
