import db from './db.js';
import bcrypt from 'bcryptjs';

export async function seed() {
  console.log('🌱 Starting Database Seeding process...\n');

  // ── 1. Users ─────────────────────────────────────────────────────────────
  const [existingUsers] = await db.query('SELECT COUNT(*) AS cnt FROM users');
  if (existingUsers[0].cnt === 0) {
    const adminPasswordHash = await bcrypt.hash('admin123', 10);
    await db.query(
      `INSERT INTO users (id, name, email, password_hash, role, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      ['user_superadmin_1', 'Super Admin', 'admin@irrecruiting.com', adminPasswordHash, 'superadmin']
    );
    console.log('✅ Seeded: users (1 admin account)');
  } else {
    console.log('ℹ️  Skipped: users (already seeded)');
  }

  // ── 2. Jobs ──────────────────────────────────────────────────────────────
  const [existingJobs] = await db.query('SELECT COUNT(*) AS cnt FROM jobs');
  if (existingJobs[0].cnt === 0) {
    const jobs = [
      {
        id: 'job_1',
        title: 'Senior Frontend Engineer (React/Vite)',
        department: 'Engineering',
        location: 'Noida, UP (Hybrid)',
        type: 'Full-time',
        experience: '4-7 Years',
        salary: '₹18L - ₹26L',
        status: 'Active',
        description: 'We are seeking an experienced React engineer to build modern, high-performance recruitment interfaces and customer portals.',
        skills: JSON.stringify(['React.js', 'Tailwind CSS', 'Vite', 'TypeScript', 'State Management']),
        responsibilities: JSON.stringify([
          'Develop modern reusable UI components in React and TypeScript.',
          'Optimize web application performance, bundle size, and rendering speed.',
          'Collaborate closely with UI/UX designers to translate Figma mockups into code.',
          'Integrate RESTful APIs and WebSocket streams for real-time tracking.'
        ]),
        requirements: JSON.stringify([
          '4+ years of professional frontend web development experience with React.',
          'Strong mastery of JavaScript (ES6+), TypeScript, HTML5, and CSS3.',
          'Experience with modern state management libraries and build tools.',
          'Obsession with UI details, accessibility, and dynamic micro-animations.'
        ]),
        created_at: '2026-09-01 10:00:00',
      },
      {
        id: 'job_2',
        title: 'Talent Acquisition Partner - Tech Hiring',
        department: 'Human Resources',
        location: 'Gurugram / Remote',
        type: 'Full-time',
        experience: '3-5 Years',
        salary: '₹12L - ₹18L',
        status: 'Active',
        description: 'Drive end-to-end recruitment for high-growth tech clients. Screen, interview, and close top engineering talent.',
        skills: JSON.stringify(['Tech Sourcing', 'LinkedIn Recruiter', 'Headhunting', 'Candidate Experience']),
        responsibilities: JSON.stringify([
          'Source software engineers and tech leads via LinkedIn, GitHub, and referral networks.',
          'Conduct structured initial phone screens and technical alignment calls.',
          'Partner with client hiring managers to understand technical requirements and team fit.',
          'Manage salary negotiation, offer creation, and candidate onboarding.'
        ]),
        requirements: JSON.stringify([
          'Proven tech hiring track record in agency or fast-growing SaaS startup.',
          'Deep familiarity with engineering roles (Backend, DevOps, Mobile, AI).',
          'High empathy and strong written communication skills.'
        ]),
        created_at: '2026-09-03 11:30:00',
      },
      {
        id: 'job_3',
        title: 'Executive Search Lead - Leadership Hiring',
        department: 'Executive',
        location: 'Noida, UP',
        type: 'Full-time',
        experience: '7-12 Years',
        salary: '₹25L - ₹40L',
        status: 'Active',
        description: 'Lead retained searches for CXO and Director-level positions across SaaS and Fintech clients.',
        skills: JSON.stringify(['Executive Search', 'Stakeholder Management', 'Confidential Sourcing', 'C-Suite Networking']),
        responsibilities: JSON.stringify([
          'Own executive search engagements end-to-end for VP and C-level mandates.',
          'Map talent pools across domestic and international technology hubs.',
          'Present detailed candidate dossiers and market intelligence to client boards.'
        ]),
        requirements: JSON.stringify([
          '7+ years in retained executive search or leadership talent acquisition.',
          'Extensive network of technology executives across APAC/India.',
          'Flawless presentation and negotiation capabilities.'
        ]),
        created_at: '2026-09-05 09:15:00',
      },
      {
        id: 'job_4',
        title: 'VP of Growth & Performance Marketing',
        department: 'Marketing',
        location: 'Bengaluru, KA',
        type: 'Full-time',
        experience: '10+ Years',
        salary: '₹40L - ₹55L',
        status: 'Active',
        description: 'Oversee performance marketing engine, brand initiatives, and user acquisition funnels for a consumer brand.',
        skills: JSON.stringify(['Performance Marketing', 'SEO/SEM', 'Funnel Optimization', 'Brand Strategy']),
        responsibilities: JSON.stringify([
          'Own multi-crore marketing budgets across digital channels (Paid Social, Search, Affiliates).',
          'Drive customer acquisition cost (CAC) optimization while scaling user lifetime value (LTV).',
          'Lead a team of performance marketers, content creators, and growth hackers.'
        ]),
        requirements: JSON.stringify([
          '10+ years of growth marketing experience in consumer internet or D2C space.',
          'Proven experience scaling revenue 5x-10x through paid and organic channels.',
          'Deep expertise in attribution modeling, ad tech platforms, and CRO.'
        ]),
        created_at: '2026-09-07 14:20:00',
      },
      {
        id: 'job_5',
        title: 'Principal DevOps Architect',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        experience: '8-11 Years',
        salary: '₹35L - ₹48L',
        status: 'Active',
        description: 'Build enterprise-grade cloud security, infrastructure as code, and developer platform tooling for cloud SaaS.',
        skills: JSON.stringify(['Terraform', 'AWS', 'Kubernetes', 'Helm', 'Prometheus', 'Security']),
        responsibilities: JSON.stringify([
          'Design, build, and maintain secure, multi-region AWS and GCP cloud infrastructures.',
          'Lead SOC2 and ISO27001 compliance automation across compute platforms.',
          'Improve developer velocity by building internal platform tools.'
        ]),
        requirements: JSON.stringify([
          '8+ years of cloud infrastructure & DevOps engineering experience.',
          'Deep expertise in Kubernetes administration, Terraform IaC, and cloud networking.',
          'Experience with zero-trust architectures and observability stacks.'
        ]),
        created_at: '2026-09-08 16:00:00',
      },
      {
        id: 'job_6',
        title: 'Head of People & Culture',
        department: 'Executive',
        location: 'Pune, MH',
        type: 'Full-time',
        experience: '12+ Years',
        salary: '₹45L - ₹60L',
        status: 'Active',
        description: 'Shape overall people strategy, organizational design, and employee engagement framework.',
        skills: JSON.stringify(['HR Strategy', 'Organizational Design', 'ESOP Planning', 'Culture & DEI']),
        responsibilities: JSON.stringify([
          'Formulate comprehensive HR strategies covering talent retention, performance management, and comp.',
          'Drive company-wide culture, diversity, and leadership enablement programs.',
          'Advise executive leadership on compensation benchmarking and ESOP structuring.'
        ]),
        requirements: JSON.stringify([
          '12+ years of HR management experience, with experience as Head/Director of HR.',
          'Strong background in scaling mid-sized organizations (200 to 1000+ employees).'
        ]),
        created_at: '2026-09-09 10:15:00',
      },
    ];

    for (const job of jobs) {
      await db.query(
        `INSERT INTO jobs (id, title, department, location, type, experience, salary, status, description, skills, responsibilities, requirements, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          job.id,
          job.title,
          job.department,
          job.location,
          job.type,
          job.experience,
          job.salary,
          job.status,
          job.description,
          job.skills,
          job.responsibilities,
          job.requirements,
          job.created_at,
        ]
      );
    }
    console.log(`✅ Seeded: jobs (${jobs.length} records)`);
  } else {
    console.log('ℹ️  Skipped: jobs (already seeded)');
  }

  // ── 3. Insights ───────────────────────────────────────────────────────────
  const [existingIns] = await db.query('SELECT COUNT(*) AS cnt FROM insights');
  if (existingIns[0].cnt === 0) {
    const articles = [
      {
        id: 'ins_301',
        title: '2026 Tech Hiring Trends: How Speed is Winning Top Candidates',
        category: 'Market Trends',
        author: 'Aditya Sharma',
        read_time: '6 min read',
        excerpt: 'With top engineers staying on the market for less than 11 days, discover how high-growth scale-ups are streamlining interview loops.',
        content: `In 2026, tech recruitment has transformed dramatically. High-growth startups and tech enterprises face an intense talent race where high-caliber engineers receive multiple offers within a week.

Key strategies for 2026:
1. Asynchronous technical assessments replacing 4-stage live coding rounds.
2. Same-day interview feedback and offer letter issuance.
3. Transparent salary bands posted directly in job descriptions.

Companies adopting 11-day hiring loops see a 94% offer acceptance rate compared to 62% for traditional 30-day hiring cycles.`,
        status: 'Published',
        published_at: '2026-09-02 10:00:00',
      },
      {
        id: 'ins_302',
        title: 'Retained Executive Search vs. Contingency: Choosing the Right Search Model',
        category: 'Executive Hiring',
        author: 'Priya Nair',
        read_time: '8 min read',
        excerpt: 'A strategic breakdown of when to deploy confidential retained executive search versus agile contingency recruitment for critical seats.',
        content: `Hiring C-suite executives (CTO, VP of Product, Chief Revenue Officer) requires a drastically different framework than scaling mid-level engineering squads.

When to use Retained Search:
- Confidential replacements or new market entry.
- Hard-to-fill niche technical leadership.
- Passive candidates who are currently employed and not looking.

When to use Contingency:
- Single contributor roles or rapid expansion pushes.
- Standard skillsets with high market availability.`,
        status: 'Published',
        published_at: '2026-09-07 12:30:00',
      },
      {
        id: 'ins_303',
        title: 'Building High-Performance Remote Engineering Cultures across India',
        category: 'Culture & Retention',
        author: 'Rohan Verma',
        read_time: '5 min read',
        excerpt: 'How top tech firms maintain high developer retention and alignment across distributed teams in Tier 1 and Tier 2 cities.',
        content: `Remote and hybrid work models are no longer optional for tech companies competing for senior developers across India.

Best practices:
- Asynchronous communication over non-stop Slack/Zoom meetings.
- Clear outcome-based performance metrics instead of tracking hours online.
- Quarterly in-person team retreats and local co-working allowances.`,
        status: 'Published',
        published_at: '2026-09-10 14:00:00',
      },
    ];

    for (const art of articles) {
      await db.query(
        `INSERT INTO insights (id, title, category, author, read_time, excerpt, content, status, published_at, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [art.id, art.title, art.category, art.author, art.read_time, art.excerpt, art.content, art.status, art.published_at]
      );
    }
    console.log(`✅ Seeded: insights (${articles.length} records)`);
  } else {
    console.log('ℹ️  Skipped: insights (already seeded)');
  }
}

seed()
  .then(async () => {
    console.log('\n🎉 Seeding script run complete!\n');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n❌ Seeding failed:', err.message);
    process.exit(1);
  });
