const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function getPrisma() {
  return prisma
}

module.exports = {
  getPrisma
}