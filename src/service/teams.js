// const { getLogger } = require('../core/logging')
const { getPrisma } = require("../data");
const prisma = getPrisma();

const getAll = async () => {
  const allTeams = await prisma.team.findMany();
  return allTeams;
};

const getById = async (id) => {
  const team = await prisma.team.findUnique({ where: { id } });
  return team;
};

module.exports = {
  getAll,
  getById,
};
