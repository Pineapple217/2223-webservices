// const { getLogger } = require('../core/logging')
const teamRepository = require('../repository/team');

const getAll = async () => {
  const allTeams = await teamRepository.findAll();
  return allTeams;
};

const getById = async (id) => {
  const team = await teamRepository.findById(id);
  return team;
};

const create = async ({
  name,
  base,
  chief,
  powerUnit,
  // drivers,
}) => {
  const newTeam = {
    name,
    base,
    chief,
    powerUnit,
    // drivers,
  };
  return await teamRepository.create(newTeam);
};

const updateById = async (
  id, 
  {
    name,
    base,
    chief,
    powerUnit,
    // drivers,
  }) => {
  const updatedTeam = {
    name,
    base,
    chief,
    powerUnit,
    // drivers,
  };

  return await teamRepository.updateById(id, updatedTeam);
};

const deleteById = async (id) => {
  const deletedTeam = await teamRepository.deleteById(id);
  return deletedTeam;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
