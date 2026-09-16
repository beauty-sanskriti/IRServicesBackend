// Inquiries Service — business logic
import * as inqRepo from './inquiries.repository.js';

const formatInquiry = (inq) => {
  if (!inq) return null;
  return {
    ...inq,
    companyName: inq.company_name,
    contactName: inq.contact_name,
    hiringType: inq.hiring_type,
    rolesNeeded: inq.roles_needed,
    targetTimeline: inq.target_timeline,
    assignedTo: inq.assigned_to,
    attachmentUrl: inq.attachment_url,
    createdAt: inq.created_at,
  };
};

export const getAllInquiries = async (query) => {
  const rows = await inqRepo.findAllInquiries(query);
  return rows.map(formatInquiry);
};

export const getInquiryById = async (id) => {
  const inq = await inqRepo.findInquiryById(id);
  if (!inq) throw { status: 404, message: 'Inquiry not found.' };
  return formatInquiry(inq);
};

export const submitInquiry = async (data, file) => {
  const { email, contactName } = data;
  if (!email) {
    throw { status: 400, message: 'email is required.' };
  }
  const attachmentUrl = file ? `/uploads/${file.filename}` : (data.attachmentUrl || null);
  const id = `inq_${Date.now()}`;
  const created = await inqRepo.createInquiry({
    id,
    companyName: data.companyName || data.company || 'N/A',
    contactName: contactName || data.name || 'Valued Lead',
    email,
    phone: data.phone,
    hiringType: data.hiringType || data.inquiryType || 'General Inquiry',
    rolesNeeded: data.rolesNeeded || data.jobTitle || null,
    targetTimeline: data.targetTimeline || data.timeline || null,
    message: data.message || data.notes || null,
    attachmentUrl,
  });
  return formatInquiry(created);
};

export const updateInquiry = async (id, data) => {
  const existing = await inqRepo.findInquiryById(id);
  if (!existing) throw { status: 404, message: 'Inquiry not found.' };
  const updated = await inqRepo.updateInquiry(id, data);
  return formatInquiry(updated);
};

export const deleteInquiry = async (id) => {
  await inqRepo.deleteInquiry(id);
};
