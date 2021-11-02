import session, { withSession } from 'next-session';
import connectKnex from 'connect-session-knex';

import knex from "../database";

const KnexSessionStore = connectKnex(session);

let store;

export default (fn) => withSession(fn, {
  storePromisify: true,
  store: store ? store : (store = new KnexSessionStore({ knex, tablename: "PM2_SESSIONS" })),
});
