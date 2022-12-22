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

module.exports = {
  getAll,
  getById,
};
