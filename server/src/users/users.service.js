import prisma from '../common/prisma-client';

export async function getOneUser(id) {
  const user = await prisma.user.findFirst({ where: { id } });
  return user;
}
