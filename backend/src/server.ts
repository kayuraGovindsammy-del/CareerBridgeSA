import app from './app.js';
import { env } from './config/env.js';

const server = app.listen(env.PORT, () => {
  console.log('');
  console.log('======================================');
  console.log('      CareerBridgeSA API Server       ');
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

function shutdown(signal: string): void {
  console.log(`\n${signal} received. Shutting down...`);

  const timeout = setTimeout(() => {
    console.error('Forced shutdown');
    process.exit(1);
  }, 10000);

  timeout.unref();

  server.close((error) => {
    clearTimeout(timeout);

    if (error) {
      console.error('Error shutting down server:', error);
      process.exit(1);
    }

    console.log('Server closed successfully.');
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));