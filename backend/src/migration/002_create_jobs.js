// Migration: Create jobs table
export const up = async (knex) => {
  await knex.schema.createTable('jobs', (table) => {
    table.string('id', 50).primary();
    table.string('title', 200).notNullable();
    table.string('department', 100).notNullable();
    table.string('location', 150).notNullable();
    table.string('type', 50).notNullable();          // Full-time, Part-time, Contract
    table.string('experience', 50).notNullable();     // e.g. "4-7 yrs"
    table.string('salary', 100).nullable();
    table.enum('status', ['Active', 'Paused', 'Closed']).notNullable().defaultTo('Active');
    table.text('description').nullable();
    table.json('requirements').nullable();            // Array stored as JSON
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
  console.log('✅ Table created: jobs');
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('jobs');
};
