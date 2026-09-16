// Migration: Enhance jobs, inquiries, and insights tables with additional fields
export const up = async (knex) => {
  const hasJobsSkills = await knex.schema.hasColumn('jobs', 'skills');
  if (!hasJobsSkills) {
    await knex.schema.alterTable('jobs', (table) => {
      table.json('skills').nullable();
      table.json('responsibilities').nullable();
    });
    console.log('✅ Altered jobs table: added skills, responsibilities');
  }

  const hasInquiriesAttachment = await knex.schema.hasColumn('inquiries', 'attachment_url');
  if (!hasInquiriesAttachment) {
    await knex.schema.alterTable('inquiries', (table) => {
      table.string('attachment_url', 500).nullable();
    });
    console.log('✅ Altered inquiries table: added attachment_url');
  }

  const hasInsightsReadTime = await knex.schema.hasColumn('insights', 'read_time');
  if (!hasInsightsReadTime) {
    await knex.schema.alterTable('insights', (table) => {
      table.string('read_time', 50).nullable().defaultTo('5 min read');
    });
    console.log('✅ Altered insights table: added read_time');
  }
};

export const down = async (knex) => {
  await knex.schema.alterTable('jobs', (table) => {
    table.dropColumn('skills');
    table.dropColumn('responsibilities');
  });
  await knex.schema.alterTable('inquiries', (table) => {
    table.dropColumn('attachment_url');
  });
  await knex.schema.alterTable('insights', (table) => {
    table.dropColumn('read_time');
  });
};
