import postgres from 'postgres';
import { env } from 'process';

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

export const sql = postgres(env.DATABASE_URL as string, {
  transform: {
    ...postgres.camel,
    undefined: null,
  },
});
