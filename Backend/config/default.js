/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const config = module.exports = {
  URL: process.env.URL,
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  ALGORITHM: process.env.ALGORITHM,
  NODE_ENV: process.env.NODE_ENV
}
