# iR Recruiting Platform

A complete, production-ready recruitment and talent acquisition platform with separate Client Frontend, Admin Dashboard, and REST API Backend.

## 📁 Directory Structure

```
IrRecruitingProject/
├── backend/          # REST API Server (Node.js + Express + JWT Auth + SQLite/JSON DB)
│   ├── server.js     # Server entry point (Runs on http://localhost:5000)
│   ├── db.js         # Persistent JSON/SQLite database storage
│   ├── middleware/   # JWT Authentication middleware
│   └── routes/       # Auth, Jobs, Candidate Applications, Employer Inquiries, Insights, Analytics
├── admin/            # Admin Management Portal (React + Vite + Tailwind CSS)
│   └── src/          # Dashboard, Jobs Manager, Applications Pipeline, Employer Leads, Insights Editor
└── frontend/         # Public Client Website (React + Vite + Tailwind CSS)
```

## 🚀 Quick Start Instructions

### 1. Launch Backend API Server (Port 5000)
```bash
cd backend
npm start
```
> **Default Admin Credentials**:
> - **Email**: `admin@irrecruiting.com`
> - **Password**: `admin123`

### 2. Launch Admin Portal (Port 5174)
```bash
cd admin
npm run dev
```
Open [http://localhost:5174](http://localhost:5174) in your browser.

### 3. Launch Client Website (Port 5173)
```bash
cd frontend
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 REST API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Admin login & JWT retrieval | No |
| `GET` | `/api/auth/me` | Current admin session details | Yes (Bearer Token) |
| `GET` | `/api/admin/stats` | Analytics overview & activity audit log | Yes (Bearer Token) |
| `GET` | `/api/jobs` | Public & Admin job listings | No |
| `POST` | `/api/jobs` | Create new job opening | Yes (Bearer Token) |
| `PUT` | `/api/jobs/:id` | Update existing job posting | Yes (Bearer Token) |
| `DELETE` | `/api/jobs/:id` | Remove job opening | Yes (Bearer Token) |
| `POST` | `/api/applications` | Submit candidate application & resume | No |
| `GET` | `/api/applications` | List candidate submissions & pipeline | Yes (Bearer Token) |
| `PATCH` | `/api/applications/:id/status` | Update candidate status (Applied, Shortlisted, Interviewing, Offered, Rejected) | Yes (Bearer Token) |
| `POST` | `/api/inquiries` | Submit employer hiring request | No |
| `GET` | `/api/inquiries` | List employer leads | Yes (Bearer Token) |
| `PATCH` | `/api/inquiries/:id` | Update employer lead status & notes | Yes (Bearer Token) |
| `GET` | `/api/insights` | Fetch published articles & reports | No |
| `POST` | `/api/insights` | Publish new insight article | Yes (Bearer Token) |
