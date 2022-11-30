// const { getLogger } = require('../core/logging')
const { getPrisma } = require("../data");
const prisma = getPrisma();

const getAll = async () => {
  const allRaces = await prisma.race.findMany();
  return allRaces;
};

const getById = async (id) => {
  const race = await prisma.race.findUnique({ where: { id } });
  return race;
};

module.exports = {
  getAll,
  getById,
};
