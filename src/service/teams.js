// const { getLogger } = require('../core/logging')
const { getPrisma } = require('../data');

const getAll = async () => {
  const prisma = getPrisma();
  const allTeams = await prisma.team.findMany();
  return allTeams;
};

const getById = async (id) => {
  const prisma = getPrisma();
  const team = await prisma.team.findUnique({ where: { id } });
  return team;
};

module.exports = {
  getAll,
  getById,
};
