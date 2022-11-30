// const { getLogger } = require('../core/logging')
const { getPrisma } = require('../data');

const getAll = async () => {
  const prisma = getPrisma();
  const allRaces = await prisma.race.findMany();
  return allRaces;
};

const getById = async (id) => {
  const prisma = getPrisma();
  const race = await prisma.race.findUnique({ where: { id } });
  return race;
};

module.exports = {
  getAll,
  getById,
};
