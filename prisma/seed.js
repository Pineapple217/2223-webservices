const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const ver = await prisma.driver.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: 'Max',
      lastName: 'Verstappen',
      shortName: 'ver',
      country: 'Netherlands',
      number: 1,
      dateOfBirth: new Date('1997-09-30'),
      team: {
        create: {
          name: 'Red Bull Racing',
          base: 'Milton Keynes, United Kingdom',
          chief: 'Christian Horner',
          powerUnit: 'Red Bull Powertrains'
        }
      }
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