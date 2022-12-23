const { getPrisma } = require('../data');

const findAll = async () => {
  const prisma = getPrisma();
  const allDrivers = await prisma.driver.findMany();
  return allDrivers;
};

const findById = async (id) => {
  const prisma = getPrisma();
  const driver = await prisma.driver.findUnique({
    where: { id },
  });
  return driver;
};

const create = async ({
  firstName,
  lastName,
  shortName,
  country,
  number,
  dateOfBirth,
  teamId,
  // races,
}) => {
  const prisma = getPrisma();
  const newDriver = await prisma.driver.create({
    data: {
      firstName,
      lastName,
      shortName,
      country,
      number,
      dateOfBirth: new Date(dateOfBirth),
      teamId,
    },
  });
  return newDriver;
};

const updateById = async (
  id,
  {
    firstName,
    lastName,
    shortName,
    country,
    number,
    dateOfBirth,
    teamId,
  }
) => {
  const prisma = getPrisma();
  const updatedDriver = await prisma.driver.update({
    where: {
      id
    },
    data: {
      firstName,
      lastName,
      shortName,
      country,
      number,
      dateOfBirth,
      teamId,
    }
  });
  return updatedDriver;
};



const deleteById = async (id) => {
  const prisma = getPrisma();
  const driver = await prisma.driver.delete({ where: { id } });
  return driver;
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};