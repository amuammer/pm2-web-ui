import knex from 'knex';
import config from '../config';

const {
  DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME, DEBUG_MODE,
} = config;

interface Config {
  client: string;
  connection: {
    user: string,
    password: string,
    host: string,
    port: string,
    database: string,
  };
  pool: { min: number, max: number };
  debug: boolean;
  fetchAsString: string[];
}

const knexConfig: Config = {
    client: "oracledb",
    connection: {
      user: DB_USER,
      password: DB_PASS,
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
    },
    pool: { min: 0, max: 2 },
    debug: DEBUG_MODE === "true",
    fetchAsString: ["number", "clob"],
  }

const knexInstance = knex(knexConfig);

export default knexInstance;
