# 🔁 Skill Swap – Backend API

This is the official **Backend Server** for the Skill Swap platform. It handles all core functionalities including authentication, user profile management, skill match requests, and feedback handling.

---

## 🌐 Live URL

**Deployed Backend on Render**  
🔗 [https://skill-swap-backend-io0v.onrender.com/](https://skill-swap-backend-io0v.onrender.com/)

---

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- REST API

---

## 📂 Project Structure

/models → Mongoose schemas (User, SwapRequest, Feedback)
/routes → All API route handlers
/controllers → Logic behind route handling
/utils → Token and middleware helpers
.env → Environment variables
server.js → App entry point


---

## 🚀 Key Features

- 🔐 User Authentication (JWT-based)
- 👤 Profile Update & Picture Upload
- 🔍 Skill Search API
- 🔄 Skill Swap Requests
- 💬 Feedback System
- 🛡️ Middleware-based security

---

## 📄 API Endpoints Overview

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password/:token`

### User
- `GET /api/user/dashboard`
- `GET /api/users?skill=searchTerm`
- `PUT /api/user/profile`
- `POST /api/user/profile-picture`

### Swap Requests
- `POST /api/swap/request`
- `GET /api/swap/requests`
- `PATCH /api/swap/requests/:id`
- `DELETE /api/swap/requests/:id`

### Feedback
- `POST /api/feedback`
- `GET /api/feedback`

---

## 🙋‍♂️ Developer

**Yash Baid**  
🎓 Amity University Haryana  
🧠 Backend Developer

---

## 📌 Related Projects

- Frontend (React): [Swap-skill-frontend](https://github.com/Yashbaid19/Swap-skill-frontend)
- Minimal Testing Frontend: [Testing Frontend](https://github.com/Yashbaid19/Testing-Frontend)
