const { withServer } = require('../helpers');

const data = {
  circuits: [
    {
      id: 1,
      city: 'Suzuka',
      name: 'Suzuka International Racing Course',
      nrOfLaps: 53,
      length: 5.807,
    },

  ]
};

const toBeDelete = {
  circuits: [
    1,
  ]
};

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
    beforeAll(async () => {
      await prisma.circuit.createMany({data: data.circuits});
    });

    afterAll(async () => {
      await prisma.circuit.deleteMany({where: {id: {in: toBeDelete.circuits}}});
    });

    test('it should 200', async () => {
      const response = await request.get(url)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('GET /api/circuits/:id', () => {
    beforeAll(async () => {
      await prisma.circuit.createMany({data: data.circuits});
    });

    afterAll(async () => {
      await prisma.circuit.deleteMany({where: {id: {in: toBeDelete.circuits}}});
    });

    test('it should 200', async () => {
      const response = await request.get(`${url}/1`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(200);
      expect(response.body.city).toBe('Suzuka');
    });
  });


  describe('DELETE /api/circuits/:id', () => {
    beforeAll(async () => {
      await prisma.circuit.createMany({data: data.circuits});
    });

    afterAll(async () => {
      await prisma.circuit.deleteMany({where: {id: {in: toBeDelete.circuits}}});
    });

    test('it should 204 and return nothing', async () => {
      const response = await request.delete(`${url}/1`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    describe('POST /api/circuits', () => {
      const circuitsToDel = [];

      beforeAll(async () => {
      });

      afterAll(async () => {
        await prisma.circuit.deleteMany({where: {id: {in: circuitsToDel}}});
      });

      test('it should 201 and return circuit', async () => {
        const response = await request.post(`${url}`)
          .set('Authorization', `Bearer ${AUTH_TOKEN}`)
          .send({
            city: 'Suzuka',
            name: 'Suzuka International Racing Course',
            nrOfLaps: 53,
            length: 5.807,
          });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeTruthy();
        expect(response.body.city).toBe('Suzuka');

        circuitsToDel.push(response.body.id);
      });
    });
  });

});