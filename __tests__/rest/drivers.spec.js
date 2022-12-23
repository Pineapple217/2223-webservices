// const each = require('jest-each').default;
const { withServer } = require('../helpers');

const data = {
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
};

describe('drivers', () => {
  let request;
  let prisma;
  let AUTH_TOKEN;

  withServer(({ prisma: p, request: r, AUTH_TOKEN: a}) => {
    prisma = p;
    request = r;
    AUTH_TOKEN = a;
  });

  const url = '/api/drivers';

  describe('GET /api/drivers', () => {
    beforeAll(async () => {
      await prisma.team.createMany({data: data.teams});
      await prisma.driver.createMany({data: data.drivers });

    });
  
    afterAll(async () => {
      await prisma.driver.delete({
        where: {
          id: 1
        }
      });

      await prisma.team.delete({
        where: {
          id: 1
        }
      });
    });

    test('it should 200 and return all drivers', async () => {
      const response = await request.get(url)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(200);
    });

    test('it should 401', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(401);
    });

    test('it should 400', async () => {
      const response = await request.get(`${url}/fsdfsf`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(400);
    });
  });

});

