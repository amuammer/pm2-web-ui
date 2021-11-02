export enum UserAppRight {
  NONE = 0,
  VIEW = 0x1,
  MANAGE = 0x2,
  DELETE = 0x4,
  INTERACT = 0x8,
};

export interface IUser {
  username: string;
  password: string;
  isAdmin: boolean;
  hasRight?: boolean;
  getPublicData?: any;
  apps: IAppOwnership[];
};

export interface IUserModel {
  findByUsername? : any;
};


export interface IAppOwnership {
  id: string;
  right: UserAppRight;
};
