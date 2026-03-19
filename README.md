<!-- ===================== HERO SECTION ===================== -->

<h1 align="center">🚗 RK Motors – AI Powered Car Marketplace</h1>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Orbitron&size=22&pause=1000&color=00F7FF&center=true&vCenter=true&width=750&lines=Smart+Car+Discovery+Platform;Advanced+Filtering+%26+Test+Drive+Scheduling;Full+Stack+MERN+%2B+Next.js+Application" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/Backend-Next.js%20%7C%20Express.js-black?style=for-the-badge&logo=next.js"/>
  <img src="https://img.shields.io/badge/Database-Supabase-3FCF8E?style=for-the-badge&logo=supabase"/>
  <img src="https://img.shields.io/badge/ORM-Prisma-2D3748?style=for-the-badge&logo=prisma"/>
  <img src="https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Security-Arcjet-red?style=for-the-badge"/>
</p>

---

## 🚗 RK Motors – AI Car Marketplace

A production-grade, full-stack AI-powered car marketplace platform.  
Built using **Next.js, MongoDB, Prisma, and Gemini API**, and enhanced with intelligent car detection, real-time communication (chat & calling), secure authentication, cloud-based image handling, and advanced backend security.

---

## 🎯 Project Overview

This project delivers a modern car marketplace experience focused on **AI-driven vehicle identification, smart search, and seamless user interaction**.  
Users can upload images to detect cars, explore listings, interact via chat and calling, and manage bookings, while admins can control listings and test drives through a dedicated dashboard.

It integrates multiple systems including **AI-powered search, Clerk authentication, Arcjet security, Cloudinary storage, and real-time communication**, all combined with a responsive and intuitive UI for a smooth user experience.

---

## 🛠 Tech Stack

| Category | Tools / Libraries |
|------|----------------|
| **Frontend** | Next.js (React), Tailwind CSS, shadCN |
| **Backend** | Next.js Server Actions, Node.js |
| **Database** | MongoDB, Prisma ORM |
| **Authentication** | Clerk (Google OAuth, Email/Password) |
| **Image Management** | Cloudinary |
| **AI Features** | Google Gemini API (Vision + Conversational) |
| **Real-Time Communication** | WebSockets (Chat), WebRTC (Calling) |
| **Email Service** | Nodemailer |
| **Security** | Arcjet (Rate Limiting, Bot Protection) |
| **Deployment** | Vercel / Render |
| **Version Control** | Git & GitHub |

---


## 📸 Snapshots

<table>
  <tr>
    <td align="center"><b>🏠 Home Page</b></td>
    <td align="center"><b>🔍 Explore Cars with Filters</b></td>
  </tr>
  <tr>
    <td><img src="public/snapshots/HomePage.png" width="100%"/></td>
    <td><img src="public/snapshots/browse-cars-page.png" width="100%"/></td>
  </tr>

  <tr><td colspan="2" height="30"></td></tr>

  <tr>
    <td align="center"><b>⭐ Highlighted Cars Section</b></td>
    <td align="center"><b>🚘 Car Details & EMI Info</b></td>
  </tr>
  <tr>
    <td><img src="public/snapshots/featured-cars-section.png" width="100%"/></td>
    <td><img src="public/snapshots/car-details-page.png" width="100%"/></td>
  </tr>

  <tr><td colspan="2" height="30"></td></tr>

  <tr>
    <td align="center"><i><b>🤖 Search Cars via Image (AI)</b></i></td>
    <td align="center"><i><b>❓ FAQ Section</b></i></td>
  </tr>
  <tr>  
    <td><img src="public/snapshots/AI-search-image.png" width="100%"/></td>
    <td><img src="public/snapshots/faq-section.png" width="100%"/></td>
  </tr>

  <tr><td colspan="2" height="30"></td></tr>

  <tr>
    <td align="center"><i><b>🔐 Login / Signup Page</b></i></td>
    <td align="center"><i><b>📊 Admin Dashboard</b></i></td>
  </tr>
  <tr>
    <td><img src="public/snapshots/loginPage.png" width="100%"/></td>
    <td><img src="public/snapshots/admin-dashboard.png" width="100%"/></td>
  </tr>

  <tr><td colspan="2" height="30"></td></tr>

  <tr>
    <td align="center"><i><b>➕ Manual Car Entry</b></i></td>
    <td align="center"><i><b>🤖 AI-Based Car Upload</b></i></td>
  </tr>
  <tr>
    <td><img src="public/snapshots/Manual-entry-section.png" width="100%"/></td>
    <td><img src="public/snapshots/AI-Upload-section.png" width="100%"/></td>
  </tr>

  <tr><td colspan="2" height="30"></td></tr>

  <tr>
    <td align="center"><i><b>🚗 Manage Car Listings</b></i></td>
    <td align="center"><i><b>📅 Manage Test Drive Requests</b></i></td>
  </tr>
  <tr>
    <td><img src="public/snapshots/admin-cars-management.png" width="100%"/></td>
    <td><img src="public/snapshots/admin-test-drives-manage.png" width="100%"/></td>
  </tr>
  
</table>
---

## 🚀 Key Features Implemented

• 🔐 **User Authentication**  
Login/signup with Email/Password and Google OAuth using Clerk with protected routes.

• 🚗 **Car Listings Management (CRUD)**  
Add, edit, delete, and explore car listings with detailed information.

• 🖼 **Image Upload System**  
Secure cloud-based image uploads using Cloudinary with manual and AI options.

• 🤖 **AI Car Detection**  
Detect car brand and model from images using Gemini Vision API.

• 🧠 **Image-to-Search Pipeline**  
Convert uploaded images into real-time car search results.

• 🔍 **Smart Search & Filters**  
Search cars with partial matching and dynamic filtering.

• 💬 **Real-Time Chat System**  
WhatsApp-like messaging between users using WebSockets.

• 📞 **Calling Feature**  
Enable direct user-to-user calling using WebRTC.

• 📧 **Email Notifications**  
Send alerts and updates using Nodemailer.

• 🤖 **Smart Assistant**  
Conversational assistant for user queries using Gemini API.

• 🛠 **Admin Panel**  
Manage cars, AI uploads, and test drive requests.

• 🛡 **Security & Protection**  
Rate limiting and bot protection using Arcjet.

• ⚡ **Performance Optimization**  
Fast backend using Next.js Server Actions and Prisma ORM.

• 📱 **Responsive Design**  
Fully responsive UI built with React and Tailwind CSS.

• ⚠️ **Error Handling**  
Graceful handling of API and AI failures for reliability.

---

## Project Structure
```bash
📁 rk-motors/
│
├── 📁 app/                # Pages & routes (Next.js App Router)
├── 📁 components/         # Reusable UI components
├── 📁 actions/            # Server actions (backend logic)
├── 📁 lib/                # DB & utility functions
├── 📁 prisma/             # Database schema (Prisma)
├── 📁 public/             # Images & static assets
├── 📁 services/           # API configs (Gemini, Cloudinary, etc.)
├── 📁 middleware/         # Security (Arcjet)
│
├── middleware.js          # Global middleware
├── next.config.mjs        # Next.js config
├── package.json           # Dependencies
├── .env                   # Environment variables
└── README.md              # Documentation
```
---

## 📊 User Workflow

1. 👉 User signs up or logs in using Email/Password or Google  
2. 🔍 User searches for cars or uploads an image for AI detection  
3. 🤖 System identifies car details using Gemini API  
4. 🚗 Relevant car listings are fetched from the database  
5. 📄 User views detailed car information and pricing  
6. 💬 User interacts via chat, calling, or smart assistant  
7. 📅 User books or requests a test drive  
8. 📧 System sends notifications and updates via email  
9. 🛠️ Admin manages listings, AI uploads, and test drive requests  

---

## 📦 Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/nahida-athanikar/rk-motors.git
cd rk-motors
```
### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Add Environment Variables
Create a .env file in the root directory:
```bash
# MongoDB
DATABASE_URL=your_mongodb_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Email (Nodemailer)
SMTP_USER=your_email
SMTP_PASS=your_password

# Arcjet Security
ARCJET_KEY=your_arcjet_key
```
#### 👉 Replace all values with your actual credentials.

### 4️⃣ Run the Application
```bash
npm run dev
```

### 5️⃣ Open in Browser
Open your browser and visit:
```bash
http://localhost:3000
```


## 🌍 Live Demo & Repository

- 🔗 **Live Project:**  https://rk-motors-blond.vercel.app/
- 📦 **GitHub Repository:** [https://github.com/nahida-athanikar/rk-motors] 

---

## 🤝 Connect With Me

If you like this project or have suggestions, feel free to connect.  
 

<p align="center">⭐ If you find this project helpful, don’t forget to star the repository!</p>




