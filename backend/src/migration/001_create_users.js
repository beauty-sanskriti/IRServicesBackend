// Migration: Create users table
export const up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.string('id', 50).primary();
    table.string('name', 100).notNullable();
    table.string('email', 150).notNullable().unique();
    table.string('password_hash', 255).notNullable();
    table.enum('role', ['superadmin', 'admin', 'recruiter']).notNullable().defaultTo('recruiter');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
  console.log('✅ Table created: users');
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('users');
};
