import { Prisma } from '@repo/prisma-client';
import prisma from '../config/prisma-client';

export async function createCategory(data) {
  console.log({ data });

  const category = await prisma.category.create({
    data: data,
  });
  return category;
}

export async function getManyCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

export async function getOneCategory(id) {
  const category = await prisma.category.findFirst({ where: { id } });
  return category;
}

export async function updateCategory(
  id,
  data,
) {
  const category = await prisma.category.update({
    where: { id },
    data: data,
  });
  return category;
}

export async function deleteCategory(id) {
  const category = await prisma.category.delete({ where: { id } });
  return category;
}
