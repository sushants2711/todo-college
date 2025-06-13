# 📝 MERN Stack Todo App

A full-stack Todo application built using **MongoDB, Express, React, Node.js**, with user **authentication via JWT**, and support for **CRUD operations** on todos. Users can signup, login, create todos, update them (mark completed), and delete them. Deployed on **Render**.

---

## 🚀 Live Demo

- 🔗 Link: [https://todo-mern-frontend-dats.onrender.com](https://todo-mern-frontend-dats.onrender.com)

---

## 🗂 GitHub Repositories

- 🔧 Code: [todo-college](https://github.com/sushants2711/todo-college)

---

## 📸 Preview

Here are some screenshots of the application:

### 1. Signup Page
![Signup Page](https://i.imgur.com/U8tkf3G.png)

### 2. Login Page
![Login Page](https://i.imgur.com/lREn5G8.png)

### 3. Create Todo
![Create Todo](https://i.imgur.com/HvnZ3le.png)

### 4. List of Todos (with status toggle)
![Todo List](https://i.imgur.com/EykTuFr.png)

### 5. Delete or Mark as Done
![Delete or Complete](https://i.imgur.com/BKnsSSb.png)

---

## ✨ Features

- 🔐 JWT-based User Authentication
- 🧑 Signup, Login, Logout
- 🛡️ Protected Private Routes
- ✅ Create, Read, Update (mark as completed), and Delete Todos
- 🍪 Cookie-based session handling
- 🎯 Simple & clean UI with React
- 🌍 Hosted on Render (both frontend and backend)

---

## 🧾 Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- fetch

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Cookie-Parser
- CORS
- Dotenv

---

## 📁 Project Structure

todo-college/
│-- .env
├── controllers/
├── middlewares/
├── models/
├── routers/
├── config/
└── index.js

todo-mern-frontend-dats/
│
├── src/
│   ├── components/         
│   ├── pages/              
│   ├── context/            
│   ├── route/            
│   ├── hooks/              
│   ├── utils/              
│   ├── App.jsx            
│   ├── main.jsx     
│
└── README.md



---

## 🛠 Setup Instructions

### ✅ Prerequisites

- Node.js installed
- MongoDB URI (local or cloud e.g., MongoDB Atlas)

---

1. Clone the backend repo:

```bash
git clone https://github.com/sushants2711/todo-college
cd todo-college

cd backend
npm install

cd ..
cd forntend
npm install

## In backend add .env file also
PORT=3000
MONGO_URL=your_mongodb_connection_uri
JWT_TOKEN=your_jwt_secret
NODE_ENV=development
cd frontend
npm run dev

cd ..
cd backend
npm run dev

** some basic change in backend like change the cors origin **
change the cors
change the secure url

** some basic changes in frontend **
call all the localhost api changes with
http://localhost:3000/api/auth  -- for authentication
http://localhost:3000/api/todo  -- for todo create

