const { getPrisma } = require('../data');

const findAll = async () => {
  const prisma = getPrisma();
  const allCircuits = await prisma.circuit.findMany();
  return allCircuits;
};

module.exports = {
  findAll
};