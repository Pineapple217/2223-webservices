// const { getLogger } = require('../core/logging')
const circuitRepository = require('../repository/circuit');

const getAll = async () => {
  const allCircuits = await circuitRepository.findAll();
  return allCircuits;
};

const getById = async (id) => {
  const circuit = await circuitRepository.findById(id);
  return circuit;
};

const create = async ({
  city,
  name,
  nrOfLaps,
  length
}) => {
  const newCircuit = {
    city,
    name,
    nrOfLaps,
    length
  };
  return await circuitRepository.create(newCircuit);
};

const updateById = async (
  id,
  {
    city,
    name,
    nrOfLaps,
    length
  }) => {
  const newCircuit = {
    city,
    name,
    nrOfLaps,
    length
  };
  return await circuitRepository.updateById(id, newCircuit);
};

const deleteById = async (id) => {
  const driver = await circuitRepository.deleteById(id);
  return driver;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};