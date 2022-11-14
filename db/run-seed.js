const seed = require('./seed');
const db = require('./connection.js');
const { catData, speciesData } = require('./data/dev-data/index.js');

seed(catData, speciesData).then(() => {
  return db.end();
});
