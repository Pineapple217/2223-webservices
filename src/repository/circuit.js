const { getPrisma } = require('../data');

const findAll = async () => {
  const prisma = getPrisma();
  const allCircuits = await prisma.circuit.findMany();
  return allCircuits;
};

const findById = async (id) => {
  const prisma = getPrisma();
  const circuit = await prisma.circuit.findUnique({
    where: { id },
  });
  return circuit;
};

const create = async ({
  city,
  name,
  nrOfLaps,
  length
}) => {
  const prisma = getPrisma();
  const newCircuit = await prisma.circuit.create({
    data: {
      city,
      name,
      nrOfLaps,
      length
    }
  });
  return newCircuit;
};

const updateById = async(
  id,
  {
    city,
    name,
    nrOflaps,
    length
  }
) => {
  const prisma = getPrisma();
  const updatedCircuit = await prisma.circuit.update({
    where: {
      id
    },
    data: {
      city,
      name,
      nrOflaps,
      length
    }
  });
  return updatedCircuit;
};

const deleteById = async (id) => {
  const prisma = getPrisma();
  const circuit = await prisma.circuit.delete({ where: { id } });
  return circuit;
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};