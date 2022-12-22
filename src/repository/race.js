const { getPrisma } = require('../data');

const findAll = async () => {
  const prisma = getPrisma();
  let allRaces = await prisma.race.findMany({
    include: {
      drivers: {select: { driverId: true}},
    }
  });
  allRaces.forEach(race => race.drivers = race.drivers.map((d) => d.driverId));
  return allRaces;
};

const findById = async (id) => {
  const prisma = getPrisma();
  const race = await prisma.race.findUnique({ where: { id } });
  return race;
};

module.exports = {
  findAll,
  findById,
};