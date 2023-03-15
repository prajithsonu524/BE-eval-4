/* eslint-disable indent */
module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.POSTGRESQL_DB_NAME || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: 5432
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.POSTGRESQL_DB_NAME || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: 5432
  },
  production: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.POSTGRESQL_DB_NAME || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: 5432
  },
  docker: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.POSTGRESQL_DB_NAME || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: 5432
  }
};


