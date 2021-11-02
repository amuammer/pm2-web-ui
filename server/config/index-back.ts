const config = {
  DB_USER: process.env.DB_USER || "user",
  DB_PASS: process.env.DB_PASS || "pass",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || "1521",
  DB_NAME: process.env.DB_NAME || "XE",
  DEBUG_MODE: process.env.DEBUG_MODE || true
};
export default config;
