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
  const newDriver = {
    firstName,
    lastName,
    shortName,
    country,
    number,
    dateOfBirth,
    teamId,
    // races,
  };
  return await driverRepository.create(newDriver);
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
  const updatedDriver = {
    firstName,
    lastName,
    shortName,
    country,
    number,
    dateOfBirth,
    teamId,
  };
  return await driverRepository.updateById(id, updatedDriver);
};

const deleteById = async (id) => {
  const driver = await driverRepository.deleteById(id);
  return driver;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
