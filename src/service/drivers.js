const { getLogger } = require('../core/logging')
const { getPrisma } = require('../data')
const prisma = getPrisma()

const getAll = async () => {
  const allDrivers = await prisma.driver.findMany()
  return allDrivers
}

module.exports = {
  getAll
}