import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const category1 = await prisma.category.create({
    data: {
      name: 'Chairs',
      slug: 'chairs',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Tables',
      slug: 'tables',
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: 'Comfortable Wooden Chair',
        description: 'A very comfortable chair for your home.',
        price: 150.00,
        imageUrl: 'https://via.placeholder.com/150',
        stock: 10,
        categoryId: category1.id,
      },
      {
        name: 'Modern Dining Table',
        description: 'A modern dining table for your family.',
        price: 450.00,
        imageUrl: 'https://via.placeholder.com/150',
        stock: 5,
        categoryId: category2.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
