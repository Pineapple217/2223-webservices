const { getPrisma } = require('../data');

const findAll = async () => {
  const prisma = getPrisma();
  const allTeams = await prisma.team.findMany();
  return allTeams;
};

const findById = async (id) => {
  const prisma = getPrisma();
  const team = await prisma.team.findUnique({
    where: { id },
    include: {
      drivers: true
    }
  });
  return team;
};

const create = async ({
  name,
  base,
  chief,
  powerUnit,
  // drivers,
}) => {
  const prisma = getPrisma();
  const newTeam = await prisma.team.create({
    data: {
      name,
      base,
      chief,
      powerUnit,
      // drivers: {connect: { id:[...drivers]}},
    }
  });
  return newTeam;
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
  const prisma = getPrisma();
  const updatedTeam = await prisma.team.update({
    where: {
      id
    },
    data: {
      name,
      base,
      chief,
      powerUnit,
      // drivers,
    }
  });
  return updatedTeam;
};

const deleteById = async (id) => {
  const prisma = getPrisma();
  const deletedTeam = await prisma.team.delete({ where: { id } });
  return deletedTeam;
};


module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
