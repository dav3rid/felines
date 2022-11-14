const seed = require('../db/seed.js');
const app = require('../app.js');
const db = require('../db/connection.js');
const { catData, speciesData } = require('../db/data/test-data/index.js');
const request = require('supertest');

beforeEach(() => {
  return seed(catData, speciesData);
});

afterAll(() => {
  return db.end();
});
