require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_URL,
    dialect: 'postgres'
  },
  test: {
    url: process.env.TEST_URL,
    dialect: 'postgres',
    logging: false
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};
