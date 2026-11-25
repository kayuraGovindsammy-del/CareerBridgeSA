import type { Request, Response } from 'express';

import { env } from '../config/env.js';

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