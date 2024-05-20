import prisma from '../config/prisma-client';

export async function createProduct(data) {
  console.log({ data });

  const product = await prisma.product.create({
    data: data,
    include: {
      category: true
    }
  });
  return product;
}

export async function getManyProducts() {
  const products = await prisma.product.findMany({
    include: {
      category: true
    }
  });
  return products;
}

export async function getOneProduct(id) {
  const product = await prisma.product.findFirst({
    where: { id }, include: {
      category: true
    },
  });
  return product;
}

export async function updateProduct(
  id,
  data,

) {
  const product = await prisma.product.update({
    where: { id },
    data: data,
    include: {
      category: true
    }
  });
  return product;
}

export async function deleteProduct(id) {
  const product = await prisma.product.delete({
    where: { id }, include: {
      category: true
    }
  });
  return product;
}
