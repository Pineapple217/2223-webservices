const supertest = require('supertest');
const config = require('config');

const { getPrisma } = require('../src/data');
const createServer = require('../src/createServer');
const AUTH_TOKEN = config.get('auth.testToken');

const withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer();

    setter({
      prisma: getPrisma(),
      request: supertest(server.getApp().callback()),
      AUTH_TOKEN: AUTH_TOKEN,
    });
  });

  afterAll(async () => {
    // Cleanup resources!
    await server.stop();
  });
};

module.exports = {
  withServer,
};