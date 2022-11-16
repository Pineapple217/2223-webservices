const { getLogger } = require('../core/logging')
const { getPrisma } = require('../data')
const prisma = getPrisma()

const getAll = async () => {
  const allCircuits = await prisma.circuit.findMany()
  return allCircuits
}

module.exports = {
  getAll
}