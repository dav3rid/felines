const db = require('../db/connection');
const { checkSpeciesExists } = require('../utils/db.js');

exports.fetchCatsBySpeciesId = (species_id) => {
  return checkSpeciesExists(species_id)
    .then(() => {
      // ONLY end up in here if the species exists
      return db.query(
        `
          SELECT * FROM cats
          WHERE species_id = $1
        `,
        [species_id]
      );
    })
    .then((res) => {
      // cats: [{catid, }, {}, {}, ...]
      // cats: []
      return res.rows;
    });
};

exports.fetchCats = () => {
  return db
    .query(
      `
    SELECT * FROM cats
    ORDER BY cuteness DESC;
  `
    )
    .then((result) => {
      return result.rows;
    });
};
