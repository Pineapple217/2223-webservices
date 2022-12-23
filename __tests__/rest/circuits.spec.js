const { withServer } = require('../helpers');

describe('circuits', () => {
  let request;
  let prisma;
  let AUTH_TOKEN;

  withServer(({ prisma: p, request: r, AUTH_TOKEN: a}) => {
    prisma = p;
    request = r;
    AUTH_TOKEN = a;
  });

  const url = '/api/circuits';

  describe('GET /api/circuits', () => {
    beforeAll(async () => {});

    afterAll(async () => {});

    test('it should 200', async () => {
      const response = await request.get(url)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(200);
    });

  });

});