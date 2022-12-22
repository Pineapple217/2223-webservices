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

const deleteById = async (id) => {
  const prisma = getPrisma();
  const driver = await prisma.driver.delete({ where: { id } });
  return driver;
};

module.exports = {
  findAll,
  findById,
  deleteById,
};