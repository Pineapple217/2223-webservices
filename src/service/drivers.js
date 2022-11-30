// const { getLogger } = require('../core/logging')
const { getPrisma } = require("../data");
const prisma = getPrisma();

const getAll = async () => {
  const allDrivers = await prisma.driver.findMany();
  return allDrivers;
};

const getById = async (id) => {
  const driver = await prisma.driver.findUnique({
    where: { id },
  });
  return driver;
};

const deleteByiD = async (id) => {
  const driver = await prisma.driver.delete({ where: { id } });
  return driver;
};

module.exports = {
  getAll,
  getById,
  deleteByiD,
};
