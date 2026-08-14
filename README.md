# 🍽️ Food Rescue Platform

> A Full-Stack Web Application to Reduce Food Wastage by Connecting Restaurants, NGOs, Volunteers, and Administrators.

![Java](https://img.shields.io/badge/Java-17+-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-brightgreen?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📖 Overview

Food waste is one of the biggest global challenges, while many people struggle with hunger every day.

The **Food Rescue Platform** is a full-stack web application that connects **Restaurants**, **NGOs**, **Volunteers**, and **Administrators** to ensure surplus food reaches people in need instead of being wasted.

---

## ✨ Features

### 👨‍💼 Admin Module
- Secure Login
- Dashboard Analytics
- Manage Restaurants
- Manage NGOs
- Manage Volunteers
- Monitor Donations
- Reports & Statistics
- Profile Management

### 🍴 Restaurant Module
- Registration & Login
- Add Food Donations
- View Donation History
- Track Requests
- Update Profile

### ❤️ NGO Module
- Registration & Login
- Browse Available Donations
- Request Food
- View Request History
- Update Profile

### 🚚 Volunteer Module
- Registration & Login
- Accept Delivery Requests
- Update Delivery Status
- View Assigned Deliveries
- Profile Management

---

# 🛠️ Tech Stack

## Frontend
- React.js
- HTML5
- CSS3
- JavaScript
- Axios
- React Router

## Backend
- Java
- Spring Boot
- Spring MVC
- Spring Security
- Spring Data JPA
- Hibernate

## Database
- MySQL

## Tools
- IntelliJ IDEA / STS
- VS Code
- Postman
- Git
- GitHub

---

# 📂 Project Structure

```
FoodRescuePlatform
│
├── backend/
│   ├── Controller
│   ├── Service
│   ├── Repository
│   ├── Entity
│   ├── DTO
│   ├── Security
│   └── Configuration
│
├── frontend/
│   ├── src
│   ├── Components
│   ├── Pages
│   ├── Services
│   ├── Assets
│   └── CSS
│
└── Database
    └── MySQL
```

---

# 🔄 System Workflow

```
Restaurant
      │
      ▼
Donate Food
      │
      ▼
Admin Verification
      │
      ▼
NGO Requests Food
      │
      ▼
Volunteer Assigned
      │
      ▼
Food Delivered
      │
      ▼
Donation Completed
```

---

# 📊 Modules

## 👨‍💼 Admin

- Dashboard
- Restaurant Management
- NGO Management
- Volunteer Management
- Donation Monitoring
- Reports
- Profile

---

## 🍽 Restaurant

- Dashboard
- Add Donation
- Donation History
- Requests
- Profile

---

## ❤️ NGO

- Dashboard
- Available Donations
- Food Requests
- Request History
- Profile

---

## 🚚 Volunteer

- Dashboard
- Assigned Deliveries
- Delivery History
- Profile

---

# 🗄 Database Tables

- admin
- restaurants
- ngos
- volunteers
- donations
- requests
- deliveries
- feedback

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/FoodRescuePlatform.git
```

---

## Backend

```bash
cd backend
```

Configure MySQL Database inside

```
application.properties
```

Run

```bash
mvn spring-boot:run
```

Backend runs on

```
http://localhost:8080
```

---

## Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on

```
http://localhost:3000
```

---

# 🔐 User Roles

| Role | Description |
|-------|-------------|
| Admin | Controls the complete system |
| Restaurant | Donates surplus food |
| NGO | Requests available food |
| Volunteer | Delivers food |

---

# 📈 Dashboard

The Admin Dashboard provides:

- Total Users
- Restaurants
- NGOs
- Volunteers
- Total Donations
- Completed Deliveries
- Pending Donations
- Reports

---

# 🎯 Objectives

- Reduce Food Waste
- Help Needy People
- Improve Food Distribution
- Digital Donation Management
- Transparent Monitoring

---

# 🌟 Future Enhancements

- Google Maps Integration
- Live Location Tracking
- AI-based Donation Matching
- Push Notifications
- QR Code Verification
- Payment Gateway for Donations
- Mobile Application
- Email & SMS Notifications

---

# 👨‍💻 Team Members

- Vadde Avinash
- Chandra Sekhar Reddy
- Chandu Gumpu
- Ajay 
- RaviTeja


Live Link : 
https://foodrescue-platform.onrender.com/
---

# 🙏 Acknowledgement

We sincerely thank our **Trainer Dilshaad Ma'am** for her constant guidance, encouragement, and valuable support throughout the development of this project. We are also grateful to our faculty members and teammates for their collaboration and contributions.

---

# 📜 License

This project is developed for educational purposes.

---

## ⭐ If you like this project, don't forget to Star the repository!
