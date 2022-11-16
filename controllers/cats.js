const { fetchCatsBySpeciesId } = require('../models/cats');

exports.getCatsBySpeciesId = (req, res, next) => {
  const { species_id } = req.params;
  fetchCatsBySpeciesId(species_id)
    .then((cats) => {
      res.status(200).send({ cats });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCats = (something, somethingElse) => {
  console.log('random stuff going on here')
  more breaking code
}