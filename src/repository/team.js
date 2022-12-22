const { getPrisma } = require('../data');

const findAll = async () => {
  const prisma = getPrisma();
  const allTeams = await prisma.team.findMany();
  return allTeams;
};

const findById = async (id) => {
  const prisma = getPrisma();
  const team = await prisma.team.findUnique({ where: { id } });
  return team;
};

module.exports = {
  findAll,
  findById,
};
