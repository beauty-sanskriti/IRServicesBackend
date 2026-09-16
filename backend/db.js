import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const getInitialData = () => {
  const salt = bcrypt.genSaltSync(10);
  const adminPasswordHash = bcrypt.hashSync('admin123', salt);

  return {
    users: [
      {
        id: 'usr_admin_1',
        name: 'iR System Admin',
        email: 'admin@irrecruiting.com',
        passwordHash: adminPasswordHash,
        role: 'superadmin',
        createdAt: new Date().toISOString()
      }
    ],
    jobs: [
      {
        id: 'job_1',
        title: 'Senior Frontend Engineer (React/Vite)',
        department: 'Engineering',
        location: 'Noida, UP (Hybrid)',
        type: 'Full-time',
        experience: '4-7 yrs',
        salary: '₹18 - ₹26 LPA',
        status: 'Active',
        description: 'We are seeking an experienced React engineer to build modern, high-performance recruitment interfaces and customer portals.',
        requirements: ['4+ years in React.js, Tailwind CSS, Vite', 'State management & REST APIs', 'Strong UI/UX sensibility'],
        createdAt: '2026-09-01T10:00:00.000Z'
      },
      {
        id: 'job_2',
        title: 'Talent Acquisition Partner - Tech Hiring',
        department: 'Recruitment',
        location: 'Gurugram / Remote',
        type: 'Full-time',
        experience: '3-5 yrs',
        salary: '₹12 - ₹18 LPA',
        status: 'Active',
        description: 'Drive end-to-end recruitment for high-growth tech clients. Screen, interview, and close top engineering talent.',
        requirements: ['Proven tech hiring track record', 'Headhunting & outbound sourcing', 'Client relationship management'],
        createdAt: '2026-09-03T11:30:00.000Z'
      },
      {
        id: 'job_3',
        title: 'Executive Search Lead - Leadership Hiring',
        department: 'Executive Search',
        location: 'Noida, UP',
        type: 'Full-time',
        experience: '7-12 yrs',
        salary: '₹25 - ₹40 LPA',
        status: 'Active',
        description: 'Lead retained searches for CXO and Director-level positions across SaaS and Fintech clients.',
        requirements: ['Senior stakeholder engagement', 'Confidential sourcing', 'Negotiation & offer closing'],
        createdAt: '2026-09-05T09:15:00.000Z'
      },
      {
        id: 'job_4',
        title: 'DevOps & Cloud Specialist',
        department: 'Infrastructure',
        location: 'Bengaluru / Hybrid',
        type: 'Full-time',
        experience: '5-8 yrs',
        salary: '₹22 - ₹32 LPA',
        status: 'Active',
        description: 'Manage AWS/GCP cloud environments, CI/CD pipelines, Kubernetes clusters, and security policies.',
        requirements: ['AWS/GCP certifications preferred', 'Docker, Kubernetes, Terraform', 'Microservices monitoring'],
        createdAt: '2026-09-07T14:20:00.000Z'
      }
    ],
    applications: [
      {
        id: 'app_101',
        jobId: 'job_1',
        jobTitle: 'Senior Frontend Engineer (React/Vite)',
        candidateName: 'Rohan Verma',
        email: 'rohan.verma@example.com',
        phone: '+91 9876543210',
        experienceYears: 5,
        currentCompany: 'TechCorp Solutions',
        portfolioUrl: 'https://github.com/rohanverma',
        resumeText: 'Experienced Frontend Engineer specialized in React, TypeScript, and UI performance optimization.',
        status: 'Shortlisted',
        appliedAt: '2026-09-08T09:30:00.000Z',
        notes: 'Great portfolio and clear experience in React.'
      },
      {
        id: 'app_102',
        jobId: 'job_2',
        jobTitle: 'Talent Acquisition Partner - Tech Hiring',
        candidateName: 'Priya Sharma',
        email: 'priya.s@example.com',
        phone: '+91 9812345678',
        experienceYears: 4,
        currentCompany: 'Innovate HR',
        portfolioUrl: 'https://linkedin.com/in/priyasharma-hr',
        resumeText: 'Tech Recruiter with 4 years experience closing 100+ software roles in SaaS companies.',
        status: 'Interviewing',
        appliedAt: '2026-09-09T14:10:00.000Z',
        notes: 'Interview scheduled for tomorrow.'
      },
      {
        id: 'app_103',
        jobId: 'job_1',
        jobTitle: 'Senior Frontend Engineer (React/Vite)',
        candidateName: 'Aman Deep',
        email: 'amandeep.dev@example.com',
        phone: '+91 9765432109',
        experienceYears: 3,
        currentCompany: 'Digital Edge',
        portfolioUrl: 'https://amandeep.dev',
        resumeText: 'Fullstack JavaScript developer skilled in React, Node.js, and CSS animations.',
        status: 'Applied',
        appliedAt: '2026-09-10T11:05:00.000Z',
        notes: 'New submission pending screening.'
      }
    ],
    inquiries: [
      {
        id: 'inq_201',
        companyName: 'Apex Cloud Systems',
        contactName: 'Vikram Malhotra',
        email: 'v.malhotra@apexcloud.io',
        phone: '+91 9988776655',
        hiringType: 'Embedded talent team',
        rolesNeeded: '5 Fullstack Devs, 2 QA Lead',
        targetTimeline: 'Within 30 Days',
        message: 'Looking for an embedded recruiting partner to scale our engineering squad next month.',
        status: 'In Discussion',
        createdAt: '2026-09-06T16:00:00.000Z',
        assignedTo: 'Admin'
      },
      {
        id: 'inq_202',
        companyName: 'NexGen Health Tech',
        contactName: 'Ananya Roy',
        email: 'ananya@nexgenhealth.com',
        phone: '+91 9876123456',
        hiringType: 'Retained executive search',
        rolesNeeded: 'Chief Technology Officer (CTO)',
        targetTimeline: 'Immediate',
        message: 'Confidential retained search for our Series-B healthtech platform.',
        status: 'New',
        createdAt: '2026-09-10T15:45:00.000Z',
        assignedTo: 'Unassigned'
      }
    ],
    insights: [
      {
        id: 'ins_301',
        title: 'Hiring Tech Talent in 2026: Speed vs. Quality',
        category: 'Market Trends',
        author: 'iR Research Team',
        excerpt: 'How leading startups are trimming time-to-offer down to 11 days without compromising candidate quality.',
        content: 'In today’s fast-moving hiring ecosystem, top developers stay on the market for less than two weeks...',
        status: 'Published',
        publishedAt: '2026-09-02T10:00:00.000Z'
      },
      {
        id: 'ins_302',
        title: 'Retained vs Contingency Search: Which Fits Your Scale?',
        category: 'Hiring Strategy',
        author: 'iR Executive Search',
        excerpt: 'A comprehensive breakdown of when to choose retained search for critical leadership roles.',
        content: 'When filling mission-critical leadership seats, the traditional contingency model often falls short...',
        status: 'Published',
        publishedAt: '2026-09-07T12:30:00.000Z'
      }
    ],
    activityLogs: [
      {
        id: 'act_1',
        action: 'System Initialized',
        user: 'System',
        timestamp: new Date().toISOString()
      }
    ]
  };
};

export const readDB = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialData();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database file:', error);
    return getInitialData();
  }
};

export const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to database file:', error);
  }
};
