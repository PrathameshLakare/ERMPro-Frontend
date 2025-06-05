# Engineering Resource Management System (ERMPro)

A full-stack application to manage engineering team assignments across projects. Designed for managers to allocate resources efficiently and for engineers to view their assignments.

## 🛠 Tech Stack

**Frontend:**

- React + TypeScript
- Tailwind CSS + ShadCN UI
- React Hook Form
- React Context

**Backend:**

- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication

**AI Tools Used:**

- ChatGPT (code generation, optimization, debugging)

---

## 🔐 Authentication & Roles

- **Manager**: Can view team capacity, create assignments, manage projects, assignments, analytics.
- **Engineer**: Can view their current assignments and profile info.

---

## 📁 Features

### ✅ Core Functionalities

- **Engineer Management**

  - Profile includes name, skills, seniority, employment type
  - Track availability in real-time based on assignment load

- **Project Management**

  - Project creation with start/end dates, skill requirements, and team size
  - Status tracking: Planning, Active, Completed

- **Assignment System**

  - Assign engineers to projects with allocation percentage
  - Visual workload indicators

- **Search & Filters**
  - Search engineers by name
  - Filter projects by skills
  - Analytics for team utilization

---

## 🧠 AI Usage Report

### Tools Used

- **ChatGPT (GPT-4o)**: Used for generating logic for assignment calculation, designing schema structures, form validations, and Redux slices.

### Examples

- Used ChatGPT to generate:
  - Capacity calculation function
  - Skill matching logic for project assignments
  - TypeScript types for cleaner form handling
  - Design suggestions and UI layout ideas

### Challenges Faced

- AI sometimes generated overly generic code, which required customization to align with specific business logic.
- Responses were occasionally inaccurate or vague, requiring very specific and clear prompts to get useful output.
- AI struggled with debugging complex issues; in most cases, manual debugging was still necessary.
- In React, AI occasionally missed or misused dependency arrays in `useEffect`, which had to be corrected manually.
- It sometimes suggested inconsistent design choices — for example, assigning different colors to similar components (e.g., gray for Sidebar and blue for Navbar), which needed manual adjustment for a consistent UI.

### How I Validated

- Manually tested all endpoints and frontend interactions
- Wrote dummy data to test different edge cases (e.g., overlapping assignments)
- Reviewed all AI-generated code and rewrote complex parts

---

## 🔄 API Endpoints

### 🔐 Auth

- `POST /api/auth/login` – Log in a user
- `GET /api/auth/profile` – Get the currently logged-in user's profile
- `POST /api/auth/profile` – Update the logged-in user's profile

### 👩‍💻 Engineers

- `GET /api/engineers` – Get a list of all engineers
- `GET /api/engineers/:id/capacity` – Get capacity details for a specific engineer

### 📁 Projects

- `GET /api/projects` – Get all projects
- `POST /api/projects` – Create a new project
- `POST /api/projects/:id` – Update an existing project
- `GET /api/projects/:id` – Get details of a specific project

### 🗂️ Assignments

- `GET /api/assignments` – Get all assignments
- `GET /api/assignments/me` – Get assignments for the logged-in engineer
- `POST /api/assignments` – Create a new assignment
- `POST /api/assignments/:id` – Update an assignment
- `DELETE /api/assignments/:id` – Delete an assignment

---

## 🗃 Sample Data

Use the included **seed script** to populate the database with initial data.

You can find the seed data and script at `api/seed/seed.js`. Running this script will add sample records to your database, including:

- 1 Manager (with email, name)
- 4 Engineers (with skills in React, Node.js, Python, etc.)
- 4 Projects (in various statuses: active, planning, completed)
- 7 Assignments (covering different roles and time durations)
- A mix of full-time and part-time engineers

---

## 🚀 Getting Started

### Frontend

Clone the frontend repository and follow these steps:

```bash
git clone https://github.com/PrathameshLakare/ERMPro-Frontend.git
npm install
npm run dev
```

Environment Variables

Create a .env file in the root of the frontend project with the following variables:

```
VITE_API_URL=http://localhost:5000

```

### Backend

```bash
git clone https://github.com/PrathameshLakare/eng-resource-management-backend.git
npm install
npm run seed   # Load sample data
npm run dev
```

Environment Variables

Create a .env file in the root of the backend project with the following variables:

```
MONGO_URI=your-mogoUri-here

JWT_SECRET=your-jwt-secrete-here

FRONTEND_URL=your-frontend-url-here(http://localhost:5173)

```
