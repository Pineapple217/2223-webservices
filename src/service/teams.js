const { getLogger } = require('../core/logging')
const { getPrisma } = require('../data')
const prisma = getPrisma()

const getAll = async () => {
  const allTeams = await prisma.team.findMany()
  return allTeams
}

module.exports = {
  getAll
}