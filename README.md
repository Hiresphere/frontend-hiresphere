# HireSphere - AI-Powered Job Application & Career Automation Platform

## 🚀 Overview

**HireSphere** automates job applications and cold outreach while also offering **AI-powered interview prep**, **resume/cover letter building**, and **career insights**, all within a beautifully integrated dashboard.

Built with a modern microservice architecture, HireSphere focuses on **efficiency, personalization**, and **customization** — empowering job seekers to land their next opportunity faster.

---

## 🧩 Core Features

### 🔹 1. Automated Job Applications

- **Job Scraping & Aggregation**  
  Scrapes listings from LinkedIn, Indeed, AngelList, and company career pages using open-source crawlers.

- **AI-Driven Resume & Cover Letter Builder**  
  Create ATS-optimized resumes and cover letters customized per job description.

- **Auto-Apply Engine**  
  Apply automatically to jobs using user-defined preferences.

- **Application Tracker**  
  Real-time dashboard to monitor applied jobs and statuses.

- **Notification System**  
  Get alerts on job matches, application updates, and deadlines.

---

### 🔹 2. Cold Outreach Automation

- **AI-Generated Personalized Messages**  
  Tailor outreach messages for recruiters, hiring managers, and HRs.

- **LinkedIn & Email Outreach**  
  Automate personalized messages via SMTP or LinkedIn API integration.

- **Follow-Up Engine**  
  Schedule automatic follow-ups based on recipient behavior and custom triggers.

- **Lead Management System**  
  Organize leads by job role, company, interaction status, etc.

---

### 🔹 3. Career Toolkit

- **AI Interview Coach**  
  Practice interviews with voice input and receive smart feedback and scores.

- **Job Recommendation Engine**  
  Suggest jobs based on profile, interests, and past activity using ML.

- **Integrated Resume & Cover Letter Builder**  
  Drag-and-drop components with keyword optimization and real-time AI suggestions.

---

### 🔹 4. User Dashboard

- **Unified Dashboard**  
  Track job applications, outreach campaigns, and interview prep in one view.

- **Insight & Analytics**  
  View job market trends, engagement stats, and performance reports.

- **Workflow Customization**  
  Customize automation settings, outreach tone, and notification preferences.

---

## 🛠️ Tech Stack

### Monorepo Architecture (Nx-based)

- **Frontend**: React.js, Tailwind CSS  
- **Backend Services** (Microservices):
  - `api-gateway` – request routing
  - `auth-service` – user authentication & session management
  - `application-service` – job applications logic
  - `outreach-service` – outreach automation
  - `resume-service` – document generation
  - `interview-service` – AI-based mock interviews

- **Database**: PostgreSQL (via Prisma / Drizzle ORM)  
- **AI Layer**: Open-source LLMs (with optional OpenAI integration)  
- **Infra**: Docker, PM2, Nx Monorepo, Husky, ESLint, Prettier

---

## ⚙️ Getting Started

### Prerequisites
- Node.js & npm
- Docker (for dev or production deployment)
- PostgreSQL or MongoDB
- (Optional) OpenAI API Key for advanced AI features

### Installation
```bash
# Clone the monorepo
git clone https://github.com/AnshumohanAcharya/hiresphere.git
cd hiresphere

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run the development servers
npx nx serve api-gateway
```

---

## 🤝 Contributing

We love contributors! Feel free to:
- Open issues or feature requests
- Submit pull requests
- Suggest new microservices