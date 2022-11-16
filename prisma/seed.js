const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.driver.deleteMany()
  await prisma.team.deleteMany()

  const redbull = await prisma.team.create({
    data: {
      name: 'Red Bull Racing',
      base: 'Milton Keynes, United Kingdom',
      chief: 'Christian Horner',
      powerUnit: 'Red Bull Powertrains'
    }
  })

  const ver = await prisma.driver.create({
    data: {
      firstName: 'Max',
      lastName: 'Verstappen',
      shortName: 'ver',
      country: 'Netherlands',
      number: 1,
      dateOfBirth: new Date('1997-09-30'),
      teamId: redbull.id
    }
  })

  const per = await prisma.driver.create({
    data: {
      firstName: 'Checo',
      lastName: 'Perez',
      shortName: 'per',
      country: 'Mexico',
      number: 11,
      dateOfBirth: new Date('1999-9-9'),
      teamId: redbull.id
    }
  })


  console.log({ ver })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })