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

const create = async ({
  start,
  name,
  isSprint,
  circuitId,
}) => {
  const newRace = {
    start,
    name,
    isSprint,
    circuitId,
  };
  return await raceRepository.create(newRace);
};

const updateById = async (
  id,
  {
    start,
    name,
    isSprint,
    circuitId,
  }) => {
  const updatedRace = {
    start,
    name,
    isSprint,
    circuitId,
  };
  return await raceRepository.updateById(id, updatedRace);
};

const deleteById = async (id) => {
  const race = await raceRepository.deleteById(id);
  return race;
};


module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
