# GigFlow – Freelance Job Bidding Platform

GigFlow is a full-stack freelance marketplace where **clients post gigs**, **freelancers place bids**, and **clients hire freelancers** with **real-time notifications** using Socket.io.

This project demonstrates authentication, authorization, REST APIs, real-time communication, and a modern React UI.

---

## ✨ Features

### 🔐 Authentication
- User registration & login
- JWT-based authentication using HTTP-only cookies
- Protected routes (frontend + backend)

### 📌 Gigs
- Clients can post new gigs
- View all available gigs
- Search gigs by title
- Gig status lifecycle: `open → assigned`

### 💼 Bids
- Freelancers can place bids on gigs
- View all bids for a gig
- Bid statuses: `pending`, `hired`, `rejected`
- Only the gig owner can hire a freelancer

### 🧠 Hiring Logic
When a client hires a freelancer:
- Gig status changes to **assigned**
- Selected bid becomes **hired**
- All other bids automatically become **rejected**

### ⚡ Real-time Notifications (Socket.io)
- Freelancers receive an **instant notification**:
  > _“You have been hired for [Project Name]!”_
- No page refresh required

### 🎨 Frontend
- Built with **React + Vite**
- Clean, responsive UI
- Separate CSS files for each page
- Logout & session persistence

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Socket.io-client
- CSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.io
- bcryptjs

---

## ▶️ Running the Project Locally

Follow the steps below to run the **GigFlow** full-stack application on your local machine.

---

### 🧩 Prerequisites

Ensure you have the following installed:

- **Node.js** (v18+ recommended)  
  https://nodejs.org
- **MongoDB**
  - MongoDB Atlas (cloud) **or**
  - Local MongoDB server
- **Git**

### ⚙️Backend Setup
- cd backend
- npm install
- npm run dev

### 🌐Frontend Setup
cd frontend

npm install

npm run dev



