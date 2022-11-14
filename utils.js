exports.createSpeciesRef = (speciesList) => {
  return speciesList.reduce((ref, species) => {
    ref[species.species_name] = species.species_id;
    return ref;
  }, {});
};

exports.formatCatsData = (catData, speciesRef) => {
  return catData.map(({ species_name, ...restOfCat }) => {
    return { ...restOfCat, species_id: speciesRef[species_name] };
  });
};
