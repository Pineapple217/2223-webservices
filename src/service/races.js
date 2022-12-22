// const { getLogger } = require('../core/logging')
const raceRepository = require('../repository/race');

const getAll = async () => {
  let allRaces = await raceRepository.findAll();
  return allRaces;
};

const getById = async (id) => {
  const race = await raceRepository.findById(id);
  return race;
};

module.exports = {
  getAll,
  getById,
};
