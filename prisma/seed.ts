const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const load = async () => {
  try {
   
    await prisma.category.deleteMany()

    // CREATEMANY nto supported for sqlite!!
    await prisma.category.create({
      data:{
        name: 'BD'
      } 
    })
    await prisma.category.create({
      data:{
        name: 'Roman'
      } 
    })

    await prisma.category.create({
      data:{
        name: 'Cuisine'
      } 
    })

    await prisma.category.create({
      data:{
        name: 'Maison'
      } 
    })

    await prisma.category.create({
      data:{
        name: 'Développement personnel'
      } 
    })

    await prisma.category.create({
      data:{
        name: 'Entreprise et bourse'
      } 
    })

  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}


load()