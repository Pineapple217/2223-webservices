const { withServer } = require('./helpers');

describe('circuits', () => {
  let request;
  let AUTH_TOKEN;

  withServer(({ request: r, AUTH_TOKEN: a}) => {
    request = r;
    AUTH_TOKEN = a;
  });


  describe('Errors', () => {
    beforeAll(async () => {});

    afterAll(async () => {});

    test('it should 404', async () => {
      const response = await request.get('/woorden')
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(404);
    });

  });

});