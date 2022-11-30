// const { getLogger } = require('../core/logging')
const { getPrisma } = require('../data');

const getAll = async () => {
  const prisma = getPrisma();
  const allCircuits = await prisma.circuit.findMany();
  return allCircuits;
};

module.exports = {
  getAll
};