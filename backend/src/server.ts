import app from './app.js';
import { env } from './config/env.js';

import {
  connectDatabase,
  disconnectDatabase,
} from './config/database.js';

async function startServer(): Promise<void> {
  await connectDatabase();

  const server = app.listen(env.PORT, () => {
    console.log('');
    console.log('======================================');
    console.log('      CareerBridgeSA API Server');
    console.log('======================================');
    console.log(`Environment: ${env.NODE_ENV}`);
    console.log(`Server: http://localhost:${env.PORT}`);
    console.log(`API: http://localhost:${env.PORT}/api/v1`);
    console.log(
      `Health: http://localhost:${env.PORT}/api/v1/health`,
    );
    console.log('======================================');
    console.log('');
  });

  let shuttingDown = false;

  function shutdown(signal: string): void {
    if (shuttingDown) return;

    shuttingDown = true;

    console.log(`\n${signal} received. Shutting down...`);

    const timeout = setTimeout(() => {
      console.error('Forced shutdown');
      process.exit(1);
    }, 10000);

    timeout.unref();

    server.close(async (error) => {
      try {
        await disconnectDatabase();

        clearTimeout(timeout);

        if (error) {
          console.error('Server shutdown error:', error);
          process.exit(1);
        }

        console.log('Server closed successfully.');
        process.exit(0);
      } catch (error) {
        console.error('Database shutdown error:', error);
        process.exit(1);
      }
    });
  }

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

startServer().catch(async (error) => {
  console.error('Failed to start CareerBridgeSA API:', error);

  await disconnectDatabase().catch(() => {});

  process.exit(1);
});