// const { getLogger } = require('../core/logging')
const driverRepository = require('../repository/driver');

const getAll = async () => {
  const allDrivers = await driverRepository.findAll();
  return allDrivers;
};

const getById = async (id) => {
  const driver = await driverRepository.findById(id);
  return driver;
};

const deleteById = async (id) => {
  const driver = await driverRepository.deleteById(id);
  return driver;
};

module.exports = {
  getAll,
  getById,
  deleteById,
};
