const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.racesOnDrivers.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.team.deleteMany();
  await prisma.race.deleteMany();
  await prisma.circuit.deleteMany();


  const redbull = await prisma.team.create({
    data: {
      name: 'red bull racing',
      base: 'milton keynes, united kingdom',
      chief: 'Mattia Binotto',
      powerUnit: 'red bull powertrains',
    },
  });

  const ferrari = await prisma.team.create({
    data: {
      name: 'Scuderia Ferrari',
      base: 'Maranello, Italy',
      chief: 'christian horner',
      powerUnit: 'Ferrari',
    },
  });

  const ver = await prisma.driver.create({
    data: {
      firstName: 'Max',
      lastName: 'Verstappen',
      shortName: 'ver',
      country: 'Netherlands',
      number: 1,
      dateOfBirth: new Date('1997-09-30'),
      teamId: redbull.id,
    },
  });

  const per = await prisma.driver.create({
    data: {
      firstName: 'Sergio',
      lastName: 'Perez',
      shortName: 'per',
      country: 'Mexico',
      number: 11,
      dateOfBirth: new Date('1990-1-26'),
      teamId: redbull.id,
    },
  });

  const lec = await prisma.driver.create({
    data: {
      firstName: 'Charles',
      lastName: 'Leclerc',
      shortName: 'lec',
      country: 'Monaco',
      number: 16,
      dateOfBirth: new Date('1997-10-16'),
      teamId: ferrari.id,
    },
  });

  const sai = await prisma.driver.create({
    data: {
      firstName: 'Carlos',
      lastName: 'Sainz',
      shortName: 'sai',
      country: 'Spain',
      number: 55,
      dateOfBirth: new Date('1994-9-1'),
      teamId: ferrari.id,
    },
  });

  console.log({ ver, per, lec, sai });

  const suzuka = await prisma.circuit.create({
    data: {
      city: 'Suzuka',
      name: 'Suzuka International Racing Course',
      nrOfLaps: 53,
      length: 5.807,
    },
  });

  const japan_2022 = await prisma.race.create({
    data: {
      start: new Date('2022-10-09T14:00:00+09:00'),
      name: 'Formula 1 Honda Japanese Grand Prix 2022',
      isSprint: false,
      circuit: {connect: {id: suzuka.id}},
      drivers: {
        create: [
          {driver: {connect: {id: ver.id}}, position: 1},
          {driver: {connect: {id: per.id}}, position: 2},
          {driver: {connect: {id: lec.id}}, position: 3},
          {driver: {connect: {id: sai.id}}, position: 4},
        ]
      },
    },
  });



  console.log({ japan_2022 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
