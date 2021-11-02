import bcrypt from "bcrypt";
import { prop, getModelForClass, DocumentType } from '@typegoose/typegoose';
import { UserAppRight, IAppOwnership, IUser, IUserModel } from '../../shared/user';

const saltRounds = 12;

import knex from "../database";

export class AppOwnership implements IAppOwnership {
  @prop({ required: true })
  public id: string;

  @prop({ required: true })
  public right: UserAppRight;
};

export class User {
  @prop({ required: true })
  public username: string;

  @prop({ default: [] })
  public apps: AppOwnership[];

  @prop()
  public isAdmin: boolean;

  @prop({ required: true })
  public password: string;

  constructor({ USERNAME, PASSWORD, ISADMIN }){
    this.username = USERNAME;
    this.password = PASSWORD;
    this.isAdmin = ISADMIN === "1";
    this.apps = [];
  }


  public hasRight(app: string, right: UserAppRight) {
    const own = this.apps.find(a => a.id === app);
    return own ? (own.right & right) === right : false;
  }

  public getPublicData() {
    return {
      username: this.username,
      isAdmin: this.isAdmin,
      apps: this.apps,
    };
  }

  public static isValidPassword(password: string, hash: string) { return bcrypt.compare(password, hash) }
  public static hash(input: string) { return bcrypt.hash(input, saltRounds); }
};



const tableName = "PM2_USERS";
export class UserModel implements IUserModel {
  /**
   * findOne
   */
  public static findByUsername(username) {
    return knex.select().from(tableName).where("USERNAME", username);
  }
}
