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

const data ={
  races: [
    {
      id: 1,
      start: new Date('2022-10-09T14:00:00+09:00'),
      name: 'Formula 1 Honda Japanese Grand Prix 2022',
      isSprint: false,
      circuitId: 1,
    }
  ],
  circuits: [
    {
      id: 1,
      city: 'Suzuka',
      name: 'Suzuka International Racing Course',
      nrOfLaps: 53,
      length: 5.807,
    },
  ],
  drivers: [
    {
      id: 1,
      firstName: 'Max',
      lastName: 'Verstappen',
      shortName: 'ver',
      country: 'Netherlands',
      number: 1,
      dateOfBirth: new Date('1997-09-30'),
      teamId: 1
    }
  ],
  teams: [
    {
      id: 1,
      name: 'red bull racing',
      base: 'milton keynes, united kingdom',
      chief: 'Mattia Binotto',
      powerUnit: 'red bull powertrains',
    }
  ],
  toDel: {
    races: [1],
    circuits: [1],
    drivers: [1],
    teams: [1],
  }
};

module.exports = {
  withServer,
  data,
};