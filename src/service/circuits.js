// const { getLogger } = require('../core/logging')
const circuitRepository = require('../repository/circuit');

const getAll = async () => {
  const allCircuits = await circuitRepository.findAll();
  return allCircuits;
};

module.exports = {
  getAll
};