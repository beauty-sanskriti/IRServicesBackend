// Migration: Create insights table
export const up = async (knex) => {
  await knex.schema.createTable('insights', (table) => {
    table.string('id', 50).primary();
    table.string('title', 300).notNullable();
    table.string('category', 100).nullable();
    table.string('author', 150).nullable();
    table.text('excerpt').nullable();
    table.longtext('content').nullable();
    table.string('cover_image_url', 500).nullable();
    table.enum('status', ['Draft', 'Published', 'Archived'])
         .notNullable().defaultTo('Draft');
    table.timestamp('published_at').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
  console.log('✅ Table created: insights');
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('insights');
};
