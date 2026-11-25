import { PrismaClient } from '@prisma/client';

import { env } from './env.js';

export const prisma = new PrismaClient({
  log:
    env.NODE_ENV === 'development'
      ? ['warn', 'error']
      : ['error'],
});

export async function connectDatabase(): Promise<void> {
  await prisma.$connect();

  console.log('PostgreSQL connected successfully.');
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();

  console.log('PostgreSQL disconnected.');
}