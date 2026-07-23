# 🚀 AyantrAI - Connected Workforce Intelligence Portal

A full-stack role-based MERN application designed for monitoring workforce compliance, managing safety violations, and real-time IoT alerts simulation.

---

## 🛠️ Tech Stack

* **Frontend:** React.js / Vite, Tailwind CSS, Axios, Lucide Icons
* **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT Authentication
* **Deployment:** Vercel (Frontend), Render (Backend)

---

## 🌐 Live Application

* **Live :** https://ayantrai-intelligence.vercel.app/

---

## 🔑 Testing & Demo Access

To test the role-based dashboards (Admin and Supervisor):
* Please refer to the default user accounts configured in the backend's `seed.js` file, or use the credentials provided in the evaluation submission email.

---

## ✨ Features

* **Role-Based Access Control (RBAC):** Secure login routing for Admin and Supervisor roles using JSON Web Tokens (JWT).
* **Supervisor Dashboard:** Real-time monitoring of PPE safety violations, alert acknowledgments, and an interactive **"Simulate IoT Alert"** feature.
* **Admin Dashboard:** High-level workforce intelligence and management controls.
* **Responsive UI:** Modern, clean, and interactive interface built for seamless desktop and mobile use.

---

## ⚙️ Local Installation & Setup

If you wish to run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/iamshrutisinha16/ayantrai-intelligence

---

## Project Structure
```text
ayantrai-assessment/
├── backend/
│   ├── models/        # Mongoose schemas (User, Worker, Violation)
│   ├── routes/        # API routes (Auth, Admin, Supervisor)
│   ├── seed.js        # Script to seed initial worker data
│   └── server.js      # Main Express server entry point
├── frontend/
│   ├── src/           # React components, pages, context
│   └── package.json   # Frontend dependencies
└── README.md          # Project documentation

### SetupBackend
```Bash
cd backend
npm install

### Run the seed script to create default users:
node seed.js
Start the backend server:
npm run dev

### Setup Frontend
cd ../frontend
npm install

###Start the frontend development server:
npm run dev