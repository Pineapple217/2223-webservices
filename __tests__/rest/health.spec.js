const { withServer } = require('../helpers');

describe('circuits', () => {
  let request;

  withServer(({ request: r}) => {
    request = r;
  });

  const url = '/api/health';

  describe('GET /api/health/ping', () => {
    test('it should 200 and return pong', async () => {
      const response = await request.get(`${url}/ping`);

      expect(response.status).toBe(200);
      expect(response.body.pong).toBe(true);
    });

  });

  describe('GET /api/health/version', () => {
    test('it should 200 and return version and env', async () => {
      const response = await request.get(`${url}/version`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('env');
      expect(response.body).toHaveProperty('version');
    }); 
  });

});