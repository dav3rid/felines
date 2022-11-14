const db = require('./connection.js');
const format = require('pg-format');
const { createSpeciesRef, formatCatsData } = require('../utils/seed.js');

const seed = (catData, speciesData) => {
  // Drop tables
  return db
    .query('DROP TABLE IF EXISTS cats;')
    .then(() => {
      return db.query('DROP TABLE IF EXISTS species;');
    })
    .then(() => {
      // Creating tables
      return db.query(`
        CREATE TABLE species (
          species_id SERIAL PRIMARY KEY,
          species_name VARCHAR(200),
          further_info TEXT
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE cats (
          cat_id SERIAL PRIMARY KEY,
          species_id INT REFERENCES species(species_id) NOT NULL,
          cat_name VARCHAR(200) NOT NULL,
          cuteness INT,
          colour VARCHAR(200)
        );
      `);
    })
    .then(() => {
      // Inserting data
      const formattedSpecies = speciesData.map((species) => {
        return [species.species_name, species.further_info];
      });
      const insertQueryStr = format(
        `
        INSERT INTO species 
          (species_name, further_info)
        VALUES
          %L
        RETURNING *;
      `,
        formattedSpecies
      );

      return db.query(insertQueryStr);
    })
    .then((speciesInsertionResult) => {
      const speciesRows = speciesInsertionResult.rows;
      const speciesRef = createSpeciesRef(speciesRows);
      const formattedCats = catData.map((cat) => [
        speciesRef[cat.species],
        cat.cat_name,
        cat.cuteness,
        cat.colour
      ]);
      const queryStr = format(
        `INSERT INTO cats
          (species_id, cat_name, cuteness, colour)
        VALUES
          %L
        RETURNING *;`,
        formattedCats
      );
      return db.query(queryStr);
    });
};

module.exports = seed;
