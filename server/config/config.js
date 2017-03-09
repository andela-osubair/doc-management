module.exports = {
  development: {
    url: process.env.URL,
    dialect: 'postgres'
  },
  test: {
    url: process.env.URL_TEST,
    dialect: 'postgres',
    logging: false
  },
  production: {
    url: process.env.URL_PRODUCTION,
    dialect: 'postgres'
  }
};
