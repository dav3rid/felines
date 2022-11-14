const { Pool } = require('pg');

const ENV = process.env.NODE_ENV || 'development';
const pathToEnvFile = `${__dirname}/../.env.${ENV}`;

require('dotenv').config({
  path: pathToEnvFile
});

if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE not set');
}

const db = new Pool();

module.exports = db;
