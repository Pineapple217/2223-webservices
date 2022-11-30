const { PrismaClient } = require('@prisma/client');

const { getLogger } = require('../core/logging');

let prisma;

async function initializeData() {
  const logger = getLogger();
  prisma = new PrismaClient();
  try {
    await prisma.$connect();
  } catch (error) {
    logger.error(error.message, { error });
    throw new Error('Could not connect with database.');
  }
  logger.info('Connected to database');
}

function getPrisma() {
  return prisma;
}

module.exports = {
  getPrisma,
  initializeData,
};
