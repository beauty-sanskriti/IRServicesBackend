// Migration: Create inquiries table
export const up = async (knex) => {
  await knex.schema.createTable('inquiries', (table) => {
    table.string('id', 50).primary();
    table.string('company_name', 200).notNullable();
    table.string('contact_name', 150).notNullable();
    table.string('email', 150).notNullable();
    table.string('phone', 30).nullable();
    table.string('hiring_type', 100).nullable();     // Embedded, Retained Search, etc.
    table.text('roles_needed').nullable();
    table.string('target_timeline', 100).nullable();
    table.text('message').nullable();
    table.enum('status', ['New', 'In Discussion', 'Proposal Sent', 'Closed', 'Lost'])
         .notNullable().defaultTo('New');
    table.string('assigned_to', 100).nullable().defaultTo('Unassigned');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
  console.log('✅ Table created: inquiries');
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('inquiries');
};
