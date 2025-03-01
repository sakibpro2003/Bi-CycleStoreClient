# Bi-Cycle Store

## 🚀 Project Overview
This project is a fully functional **Bi-Cycle Store** website featuring user authentication, product management, order processing, and payment integration. The website is designed to be responsive and user-friendly, adhering to the given Figma design.

## 🌐 Live Demo
🔗 [Live Website](https://bi-cycle-store-client-red.vercel.app/)

## 📂 Repository Links
- **Backend:** [GitHub Repo](https://github.com/your-username/bicycle-store-backend)

## 🛠️ Features
### ✅ **Frontend (Client-Side)**
- **Role-Based Authentication** (User & Admin)
- **Product Listings** with Filtering & Sorting
- **Product Details Page**
- **Checkout Process**
- **Dashboard**:
  - **User:** Order history & account management
  - **Admin:** Product & Order management
- **Responsive UI** (Fully optimized for all devices)
- **Payment Gateway Integration** (SSLCommerz, Stripe, etc.)

### ✅ **Backend (Server-Side)**
- **User Authentication** (JWT, Secure Password Hashing)
- **Product Management** (CRUD Operations)
- **Order Processing** (Stock Validation, CRUD Operations)
- **Secure API Routes** (Role-Based Access Control)
- **Database Management** (MongoDB with Mongoose Schema)
- **Error Handling & Pagination**

## 🏗️ Tech Stack
### **Frontend**
- React.js (TypeScript)
- Redux Toolkit & RTK Query
- Tailwind CSS (DaisyUI & ShadCN)
- React Router DOM
- React Hook Form & Zod
- Axios

### **Backend**
- Node.js & Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Stripe / SSLCommerz Payment Integration
- Express Validator & Bcrypt



### **2️⃣ Backend Setup**
```bash
cd bicycle-store-backend
npm install
```
- Create a **.env** file and configure the following:
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
STRIPE_SECRET=your-stripe-secret
```
- Start the backend server:
```bash
npm run dev
```

### **3️⃣ Frontend Setup**
```bash
cd bicycle-store-frontend
npm install
```
- Start the frontend:
```bash
npm run dev
```

## 📹 Demo Video
🎥 [Watch the Functionality Walkthrough](https://your-demo-video-link.com)

💡 **Developed By:** [Sakib Prodhan]

