// Dashboard Repository — DB queries for dashboard overview & stats
import db from '../../config/db.js';

export const getDashboardMetrics = async () => {
  const [[{ totalJobs }]]        = await db.query("SELECT COUNT(*) AS totalJobs FROM jobs WHERE status='Active'");
  const [[{ totalApplications }]] = await db.query('SELECT COUNT(*) AS totalApplications FROM applications');
  const [[{ totalInquiries }]]    = await db.query('SELECT COUNT(*) AS totalInquiries FROM inquiries');
  const [[{ newInquiries }]]      = await db.query("SELECT COUNT(*) AS newInquiries FROM inquiries WHERE status='New'");
  const [[{ shortlisted }]]       = await db.query("SELECT COUNT(*) AS shortlisted FROM applications WHERE status='Shortlisted'");
  const [[{ interviewing }]]      = await db.query("SELECT COUNT(*) AS interviewing FROM applications WHERE status='Interviewing'");
  const [[{ publishedInsights }]] = await db.query("SELECT COUNT(*) AS publishedInsights FROM insights WHERE status='Published'");

  const [rawApps] = await db.query(
    'SELECT id, candidate_name, job_title, email, experience_years, status, applied_at FROM applications ORDER BY applied_at DESC LIMIT 5'
  );
  const recentApplications = rawApps.map(a => ({
    id: a.id,
    candidateName: a.candidate_name,
    jobTitle: a.job_title,
    email: a.email,
    experienceYears: a.experience_years,
    status: a.status,
    appliedAt: a.applied_at
  }));

  const [rawInqs] = await db.query(
    'SELECT id, company_name, contact_name, hiring_type, roles_needed, status, created_at FROM inquiries ORDER BY created_at DESC LIMIT 5'
  );
  const recentInquiries = rawInqs.map(i => ({
    id: i.id,
    companyName: i.company_name,
    contactName: i.contact_name,
    hiringType: i.hiring_type,
    rolesNeeded: i.roles_needed,
    status: i.status,
    createdAt: i.created_at
  }));

  return {
    metrics: {
      totalApplications,
      shortlistedCandidates: shortlisted + interviewing,
      activeJobs: totalJobs,
      openInquiries: totalInquiries,
      publishedInsights: publishedInsights || 0
    },
    stats: { totalJobs, totalApplications, totalInquiries, newInquiries, shortlisted, interviewing },
    recentApplications,
    recentInquiries
  };
};

export const getAllUsers = async () => {
  const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
  return rows;
};

export const getActivityLogs = async () => {
  const [rows] = await db.query('SELECT * FROM activity_logs ORDER BY timestamp DESC LIMIT 50');
  return rows;
};
