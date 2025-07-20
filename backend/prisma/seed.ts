import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  // Create Categories
  const livingRoom = await prisma.category.create({
    data: { name: 'Living Room', slug: 'living-room' },
  });
  const bedroom = await prisma.category.create({
    data: { name: 'Bedroom', slug: 'bedroom' },
  });
  const dining = await prisma.category.create({
    data: { name: 'Dining', slug: 'dining' },
  });
  const office = await prisma.category.create({
    data: { name: 'Office', slug: 'office' },
  });
  const outdoor = await prisma.category.create({
    data: { name: 'Outdoor', slug: 'outdoor' },
  });

  // Create Products
  await prisma.product.createMany({
    data: [
      // Living Room Products
      {
        name: 'Plush Velvet Sofa',
        description: 'A luxurious and comfortable sofa for your living room.',
        price: 899.99,
        imageUrl: 'https://via.placeholder.com/300x200?text=Velvet+Sofa',
        stock: 15,
        categoryId: livingRoom.id,
      },
      {
        name: 'Modern Glass Coffee Table',
        description: 'Sleek and stylish coffee table with a tempered glass top.',
        price: 249.99,
        imageUrl: 'https://via.placeholder.com/300x200?text=Glass+Table',
        stock: 25,
        categoryId: livingRoom.id,
      },
      // Bedroom Products
      {
        name: 'Queen Size Upholstered Bed',
        description: 'Elegant queen size bed with a soft upholstered headboard.',
        price: 699.99,
        imageUrl: 'https://via.placeholder.com/300x200?text=Queen+Bed',
        stock: 10,
        categoryId: bedroom.id,
      },
      {
        name: 'Oak Wood Nightstand',
        description: 'A classic nightstand with two drawers for storage.',
        price: 149.99,
        imageUrl: 'https://via.placeholder.com/300x200?text=Nightstand',
        stock: 30,
        categoryId: bedroom.id,
      },
      // Dining Products
      {
        name: 'Extendable Dining Table',
        description: 'A versatile dining table that can seat up to 8 people.',
        price: 599.99,
        imageUrl: 'https://via.placeholder.com/300x200?text=Dining+Table',
        stock: 12,
        categoryId: dining.id,
      },
      {
        name: 'Leather Dining Chairs (Set of 4)',
        description: 'Comfortable and stylish dining chairs with a leather finish.',
        price: 399.99,
        imageUrl: 'https://via.placeholder.com/300x200?text=Dining+Chairs',
        stock: 20,
        categoryId: dining.id,
      },
      // Office Products
      {
        name: 'Ergonomic Office Chair',
        description: 'A comfortable and supportive chair for your home office.',
        price: 299.99,
        imageUrl: 'https://via.placeholder.com/300x200?text=Office+Chair',
        stock: 40,
        categoryId: office.id,
      },
      {
        name: 'Spacious Work Desk',
        description: 'A large desk with plenty of space for your computer and accessories.',
        price: 349.99,
        imageUrl: 'https://via.placeholder.com/300x200?text=Work+Desk',
        stock: 18,
        categoryId: office.id,
      },
      // Outdoor Products
      {
        name: 'Wicker Patio Set',
        description: 'A comfortable and durable patio set for your outdoor space.',
        price: 799.99,
        imageUrl: 'https://via.placeholder.com/300x200?text=Patio+Set',
        stock: 8,
        categoryId: outdoor.id,
      },
      {
        name: 'Outdoor Lounge Chair',
        description: 'A relaxing lounge chair for your patio or garden.',
        price: 199.99,
        imageUrl: 'https://via.placeholder.com/300x200?text=Lounge+Chair',
        stock: 22,
        categoryId: outdoor.id,
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
