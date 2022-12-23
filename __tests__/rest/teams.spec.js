const { withServer, data } = require('../helpers');

describe('circuits', () => {
  let request;
  let prisma;
  let AUTH_TOKEN;

  withServer(({ prisma: p, request: r, AUTH_TOKEN: a}) => {
    prisma = p;
    request = r;
    AUTH_TOKEN = a;
  });

  const url = '/api/teams';

  describe('GET /api/teams', () => {
    beforeAll(async () => {
      await prisma.team.createMany({data: data.teams});
    });

    afterAll(async () => {
      await prisma.team.deleteMany({where: {id: {in: data.toDel.teams}}});
    });

    test('it should 200 and retrun all teams', async () => {
      const response = await request.get(url)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('GET /api/teams/:id', () => {
    beforeAll(async () => {
      await prisma.team.createMany({data: data.teams});
    });

    afterAll(async () => {
      await prisma.team.deleteMany({where: {id: {in: data.toDel.teams}}});
    });

    test('it should 200 and return selected team', async () => {
      const response = await request.get(`${url}/1`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('red bull racing');
    });
  });

  describe('DELETE /api/teams/:id', () => {
    beforeAll(async () => {
      await prisma.team.createMany({data: data.teams});
    });

    afterAll(async () => {
      await prisma.team.deleteMany({where: {id: {in: data.toDel.teams}}});
    });

    test('it should 204 and return nothing', async () => {
      const response = await request.delete(`${url}/1`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });

  describe('POST /api/teams/:id', () => {
    const teamsToDel = [];
    beforeAll(async () => {
      await prisma.team.createMany({data: data.teams});
    });

    afterAll(async () => {
      await prisma.team.deleteMany({where: {id: {in: data.toDel.teams}}});
    });

    test('it should 201 and return the created team', async () => {
      const response = await request.post(`${url}`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send({
          name: 'red bull racing',
          base: 'milton keynes, united kingdom',
          chief: 'Mattia Binotto',
          powerUnit: 'red bull powertrains',
        });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.name).toBe('red bull racing');

      teamsToDel.push(response.body.id);
    });
  });


  describe('PUT /api/teams/:id', () => {
    beforeAll(async () => {
      await prisma.team.createMany({data: data.teams});
    });

    afterAll(async () => {
      await prisma.team.deleteMany({where: {id: {in: data.toDel.teams}}});
    });

    test('it should 204 and return nothing', async () => {
      const response = await request.put(`${url}/1`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send({
          name: 'red bull racing, nu anders',
          base: 'milton keynes, united kingdom',
          chief: 'Mattia Binotto',
          powerUnit: 'red bull powertrains',
        });

      expect(response.status).toBe(200);
      expect(response.body.id).toBeTruthy();
      expect(response.body.name).toBe('red bull racing, nu anders');
    });
  });

});