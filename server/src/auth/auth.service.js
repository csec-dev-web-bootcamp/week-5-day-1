import * as argon2 from 'argon2';
import { HttpException } from '../common/http-exception';
import prisma from '../common/prisma-client';

export async function createUser(data) {
  const userExist = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (userExist) {
    throw new HttpException('User already exist with this Email', 409);
  }

  const hash = await argon2.hash(data.password);
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hash,
    },
  });

  return user;
}

export async function loginUser(data) {
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new HttpException('User not found', 404);
  }

  const valid = await argon2.verify(user.password, data.password);

  if (!valid) {
    throw new HttpException('Invalid password', 401);
  }

  return user;
}

export async function findUserById(id) {
  const user = await prisma.user.findFirst({
    where: { id },
  });

  if (!user) {
    throw new HttpException('User not found', 404);
  }

  return user;
}
