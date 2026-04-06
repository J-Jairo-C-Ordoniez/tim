import { PrismaClient } from '@prisma/client'
import { generateSilhouettePoint } from '../src/lib/utils.js'

const prisma = new PrismaClient()

async function main() {
  const cells = await prisma.cell.findMany()
  console.log(`Found ${cells.length} cells. Updating...`)

  for (const cell of cells) {
    const pt = generateSilhouettePoint()
    await prisma.cell.update({
      where: { id: cell.id },
      data: {
        x: pt.x,
        y: pt.y
      }
    })
  }

  console.log('Done updating cells.')
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
