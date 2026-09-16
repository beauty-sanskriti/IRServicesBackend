/**
 * migrate.js — Run all Knex migrations against MySQL
 * Usage: node src/config/migrate.js
 */

import mysql from 'mysql2/promise';
import knex from 'knex';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const DB_NAME = process.env.DB_NAME || 'ir_recruiting_db';

// ─── Step 1: Create database if not exists ──────────────────────────────────
async function createDatabase() {
  const connection = await mysql.createConnection({
    host:     process.env.DB_HOST     || 'localhost',
    port:     Number(process.env.DB_PORT) || 3306,
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  await connection.execute(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  console.log(`✅ Database "${DB_NAME}" ready.`);
  await connection.end();
}

// ─── Step 2: Run migrations ─────────────────────────────────────────────────
async function runMigrations() {
  const db = knex({
    client: 'mysql2',
    connection: {
      host:     process.env.DB_HOST     || 'localhost',
      port:     Number(process.env.DB_PORT) || 3306,
      user:     process.env.DB_USER     || 'root',
      password: process.env.DB_PASSWORD || '',
      database: DB_NAME,
      charset:  'utf8mb4',
    },
    migrations: {
      directory: path.join(__dirname, '../migration'),
      extension: 'js',
    },
  });

  try {
    console.log('\n🔄 Running migrations...\n');
    const [batchNo, migrations] = await db.migrate.latest();

    if (migrations.length === 0) {
      console.log('ℹ️  No new migrations to run. Database is up to date.');
    } else {
      console.log(`\n✅ Batch ${batchNo} — ${migrations.length} migration(s) applied:`);
      migrations.forEach((m) => console.log(`   → ${path.basename(m)}`));
    }
  } finally {
    await db.destroy();
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────
(async () => {
  try {
    await createDatabase();
    await runMigrations();
    console.log('\n🎉 Migration complete! Open PHPMyAdmin to verify.\n');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration failed:', err.message);
    process.exit(1);
  }
})();
