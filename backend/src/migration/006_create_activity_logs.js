// Migration: Create activity_logs table
export const up = async (knex) => {
  await knex.schema.createTable('activity_logs', (table) => {
    table.increments('id').primary();
    table.string('action', 300).notNullable();
    table.string('user', 150).nullable().defaultTo('System');
    table.string('entity_type', 100).nullable();   // 'job', 'application', 'inquiry', etc.
    table.string('entity_id', 50).nullable();
    table.json('meta').nullable();                  // Extra data (JSON)
    table.timestamp('timestamp').defaultTo(knex.fn.now());
  });
  console.log('✅ Table created: activity_logs');
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('activity_logs');
};
