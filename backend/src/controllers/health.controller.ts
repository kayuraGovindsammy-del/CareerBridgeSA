import type { Request, Response } from 'express';

import { env } from '../config/env.js';
import { prisma } from '../config/database.js';

export function getHealth(
  _req: Request,
  res: Response,
): void {
  res.status(200).json({
    success: true,
    data: {
      service: 'CareerBridgeSA API',
      version: '0.1.0',
      status: 'healthy',
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
    },
  });
}

export async function getReadiness(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      data: {
        service: 'CareerBridgeSA API',
        status: 'ready',
        database: 'connected',
        timestamp: new Date().toISOString(),
      },
    });
  } catch {
    res.status(503).json({
      success: false,
      error: {
        code: 'DATABASE_UNAVAILABLE',
        message: 'Database connection unavailable',
      },
    });
  }
}