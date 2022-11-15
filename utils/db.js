const db = require('../db/connection');

exports.checkSpeciesExists = (species_id) => {
  // purpose: reject if it doesn't exist
  return db
    .query(
      `
        SELECT * FROM species
        WHERE species_id = $1
      `,
      [species_id]
    )
    .then((res) => {
      if (res.rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'species not found!' });
      }
    });
};
