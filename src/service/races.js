// const { getLogger } = require('../core/logging')
const { getPrisma } = require('../data');

const getAll = async () => {
  const prisma = getPrisma();
  let allRaces = await prisma.race.findMany({
    include: {
      drivers: {select: { driverId: true}},
    }
  });
  allRaces.forEach(race => race.drivers = race.drivers.map((d) => d.driverId));
  for (let i in allRaces.drivers) {
    console.log(i);
  }
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
