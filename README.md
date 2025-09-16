# MERN Task Manager

A simple **Task Manager App** built with the **MERN stack** (MongoDB, Express, React, Node.js). Users can register, log in, and manage tasks securely with **JWT authentication**.

---

## Features
- User registration & login
- JWT-based authentication
- Create, read, update, and delete tasks
- Protected API routes
- Frontend built with React + Vite
- Backend powered by Express & MongoDB
- Deployment ready on Vercel

---

## Tech Stack
- **Frontend:** React, Vite, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JSON Web Token (JWT)
- **Deployment:** Vercel

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/mern-task-manager.git
cd mern-task-manager
```

### 2. Install dependencies
Backend:
```bash
npm install
```
Frontend:
```bash
cd client
npm install
```

### 3. Set environment variables
Create a `.env` file in the root folder and add:
```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4. Run the app
Backend:
```bash
npm run dev
```
Frontend:
```bash
cd client
npm run dev
```

---

## API Endpoints
- `POST /api/users/register` → Register user
- `POST /api/users/login` → Login user
- `GET /api/tasks` → Get tasks (protected)
- `POST /api/tasks` → Add new task (protected)
- `PUT /api/tasks/:id` → Update task (protected)
- `DELETE /api/tasks/:id` → Delete task (protected)

---

## Deployment
This project is configured for **Vercel** deployment. Both frontend and backend API routes can run on Vercel serverless functions.

