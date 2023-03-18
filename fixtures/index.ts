import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  const buford = await prisma.user.upsert({
    where: { email: 'buford@gmail.com' },
    update: {},
    create: {
      email: 'buford@gmail.com',
      name: 'Buford',
    },
  })
  const velin = await prisma.user.upsert({
    where: { email: 'velin.br.vangelov@gmail.com' },
    update: {},
    create: {
      email: 'velin.br.vangelov@gmail.com' ,
      name: 'Velin Vangelov',
      projects: {
        create: [{
          "name": "beep",
          "url": "youtube.com",
          "testimonials": {
            create: [{
              "name": "John Doe",
              "tagline": "Big Boss Man",
              "body": "I'm a very happy body"
            }]
          }
        }]
      }
    },
  })
  console.log(velin, buford);
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
