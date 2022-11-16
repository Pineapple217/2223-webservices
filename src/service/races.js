const { getLogger } = require('../core/logging')
const { getPrisma } = require('../data')
const prisma = getPrisma()

const getAll = async () => {
  const allRaces = await prisma.race.findMany()
  return allRaces
}

module.exports = {
  getAll
}