const { getPrisma } = require('../data');

const findAll = async () => {
  const prisma = getPrisma();
  let allRaces = await prisma.race.findMany({
  });
  // allRaces.forEach(race => race.drivers = race.drivers.map((d) => d.driverId));
  return allRaces;
};

const findById = async (id) => {
  const prisma = getPrisma();
  const race = await prisma.race.findUnique({
    where: { id },
    include: {
      drivers: {select: { driverId: true, position: true}},
    }
  });
  return race;
};

const create = async ({
  start,
  name,
  isSprint,
  circuitId,
}) => {
  const prisma = getPrisma();
  const newRace = await prisma.race.create({
    data: {
      start: new Date(start),
      name,
      isSprint,
      circuitId,
    }
  });
  return newRace;
};

const updateById = async(
  id,
  {
    start,
    name,
    isSprint,
    circuitId,
  }
) => {
  const prisma = getPrisma();
  const updatedRace = await prisma.race.update({
    where: {
      id
    },
    data: {
      start: new Date(start),
      name,
      isSprint,
      circuitId,
    }
  });
  return updatedRace;
};

const deleteById = async (id) => {
  const prisma = getPrisma();
  const race = await prisma.race.delete({ where: { id } });
  return race;
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};