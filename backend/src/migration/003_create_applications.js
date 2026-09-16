// Migration: Create applications table
export const up = async (knex) => {
  await knex.schema.createTable('applications', (table) => {
    table.string('id', 50).primary();
    table.string('job_id', 50).notNullable()
         .references('id').inTable('jobs').onDelete('CASCADE');
    table.string('job_title', 200).notNullable();
    table.string('candidate_name', 150).notNullable();
    table.string('email', 150).notNullable();
    table.string('phone', 30).nullable();
    table.integer('experience_years').unsigned().defaultTo(0);
    table.string('current_company', 150).nullable();
    table.string('portfolio_url', 500).nullable();
    table.text('resume_text').nullable();
    table.string('resume_file_path', 500).nullable();   // for uploaded resume
    table.enum('status', ['Applied', 'Shortlisted', 'Interviewing', 'Offered', 'Rejected', 'Hired'])
         .notNullable().defaultTo('Applied');
    table.text('notes').nullable();
    table.timestamp('applied_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
  console.log('✅ Table created: applications');
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('applications');
};
