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

  const url = '/api/races';

  describe('GET /api/races', () => {
    beforeAll(async () => {
      console.log(data.teams);
      await prisma.team.createMany({data: data.teams});
      await prisma.driver.createMany({data: data.drivers });
      await prisma.circuit.createMany({data: data.circuits });
      await prisma.race.createMany({data: data.races });
    });

    afterAll(async () => {
      await prisma.race.deleteMany({where: {id: {in: data.toDel.races}}});
      await prisma.circuit.deleteMany({where: {id: {in: data.toDel.circuits}}});
      await prisma.driver.deleteMany({where: {id: {in: data.toDel.drivers}}});
      await prisma.team.deleteMany({where: {id: {in: data.toDel.teams}}});
    });

    test('it should 200 and return all races', async () => {
      const response = await request.get(url)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

  });

  describe('GET /api/races/:id', () => {
    beforeAll(async () => {
      console.log(data.teams);
      await prisma.team.createMany({data: data.teams});
      await prisma.driver.createMany({data: data.drivers });
      await prisma.circuit.createMany({data: data.circuits });
      await prisma.race.createMany({data: data.races });
    });

    afterAll(async () => {
      await prisma.race.deleteMany({where: {id: {in: data.toDel.races}}});
      await prisma.circuit.deleteMany({where: {id: {in: data.toDel.circuits}}});
      await prisma.driver.deleteMany({where: {id: {in: data.toDel.drivers}}});
      await prisma.team.deleteMany({where: {id: {in: data.toDel.teams}}});
    });

    test('it should 200 and retrun select race', async () => {
      const response = await request.get(`${url}/1`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Formula 1 Honda Japanese Grand Prix 2022');
    });

  });

  describe('DELETE /api/races/:id', () => {
    beforeAll(async () => {
      console.log(data.teams);
      await prisma.team.createMany({data: data.teams});
      await prisma.driver.createMany({data: data.drivers });
      await prisma.circuit.createMany({data: data.circuits });
      await prisma.race.createMany({data: data.races });
    });

    afterAll(async () => {
      await prisma.race.deleteMany({where: {id: {in: data.toDel.races}}});
      await prisma.circuit.deleteMany({where: {id: {in: data.toDel.circuits}}});
      await prisma.driver.deleteMany({where: {id: {in: data.toDel.drivers}}});
      await prisma.team.deleteMany({where: {id: {in: data.toDel.teams}}});
    });

    test('it should 204 and return nothing', async () => {
      const response = await request.delete(`${url}/1`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });

  describe('POST /api/races', () => {
    const racesTodel = [];
    beforeAll(async () => {
      console.log(data.teams);
      await prisma.team.createMany({data: data.teams});
      await prisma.driver.createMany({data: data.drivers });
      await prisma.circuit.createMany({data: data.circuits });
    });

    afterAll(async () => {
      await prisma.race.deleteMany({where: {id: {in: racesTodel}}});
      await prisma.circuit.deleteMany({where: {id: {in: data.toDel.circuits}}});
      await prisma.driver.deleteMany({where: {id: {in: data.toDel.drivers}}});
      await prisma.team.deleteMany({where: {id: {in: data.toDel.teams}}});
    });

    test('it should 201 and return the created race', async () => {
      const response = await request.post(`${url}`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send({
          start: new Date('2022-10-09T14:00:00+09:00'),
          name: 'Formula 1 Honda Japanese Grand Prix 2022',
          isSprint: false,
          circuitId: 1,
        });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.name).toBe('Formula 1 Honda Japanese Grand Prix 2022');

      racesTodel.push(response.body.id);
    });
  });

});