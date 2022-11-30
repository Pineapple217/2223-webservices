const { PrismaClient } = require('@prisma/client');
const emoji = require('node-emoji');

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
  logger.info(`${emoji.get('ok')} Connected to database`);
}

function getPrisma() {
  if (!prisma) throw new Error('Please initialize the data layer before getting the Prisma instance');
  return prisma;
}

async function shutdownData() {
  const logger = getLogger();
  await prisma.$disconnect();
  logger.info(`${emoji.get('red_circle')}Database connection closed`);
}

module.exports = {
  getPrisma,
  initializeData,
  shutdownData,
};
