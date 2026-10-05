# Courier Management System

## Description

Courier Management System is a simple MERN Stack project for managing courier bookings, shipments, customers, staff, and delivery status.

It has three types of users: Customer, Staff, and Admin. Each user can access the features needed for their role.

---

## Features

### Customer

* Register and login
* Book a courier
* Get a tracking ID
* Track shipment
* View booking history

### Staff

* Login
* View assigned shipments
* Manage deliveries
* Update shipment status

### Admin

* Login
* Dashboard
* Manage customers
* Manage staff
* Manage shipments
* View reports and statistics

---

## Main Modules

* User Management
* Courier Booking
* Shipment Management
* Courier Tracking
* Staff Management
* Admin Management
* Authentication & Authorization
* Dashboard & Reports
* PDF Generation

---

## Technologies Used

### Frontend

* React.js
* React Router DOM
* Axios
* Chart.js
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* CORS
* dotenv
* PDFKit

---

## Project Structure

```text
courier-management-system/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   ├── server.js
│   └── ...
│
├── README.md
└── .gitignore
```

---

## Authentication

JWT is used for login and role-based access. Passwords are protected using **bcryptjs**.

### Admin and Staff Setup

Admin and Staff accounts can be created or updated from the backend using the available setup scripts.

```bash
node createAdmin.js
node createStaff.js
```

These scripts connect to MongoDB and create or update the accounts.

---

## PDF Generation

The project uses **PDFKit** for generating courier-related PDF documents.

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/modimanisha723/Courier_management_system.git
```

```bash
cd courier-management-system
```

---

### 2. Backend Setup

Open the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_JWT_SECRET
```

Start the backend server:

```bash
npm run dev
```

If Nodemon is not configured, you can use:

```bash
node server.js
```

---

### 3. Frontend Setup

Open a new terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

---

## Environment Variables

Create a `.env` file inside the `backend` directory.

| Variable     | Description                            |
| ------------ | -------------------------------------- |
| `PORT`       | Backend server port                    |
| `MONGO_URI`  | MongoDB database connection URL        |
| `JWT_SECRET` | Secret key used for JWT authentication |

---

## How It Works

```text
Customer
   │
   ├── Register / Login
   │
   ├── Book Courier
   │
   ├── Get Tracking ID
   │
   └── Track Shipment
          │
          ▼
       Staff
          │
          ├── View Assigned Shipment
          ├── Update Status
          └── Manage Delivery
          │
          ▼
       Admin
          │
          ├── Manage Customers
          ├── Manage Staff
          ├── Manage Shipments
          └── View Dashboard & Statistics
```

---

## Dashboard

The Admin Dashboard shows basic information about customers, staff, shipments, and courier statistics.

---

## Future Improvements

The project can be further extended with:

* 📧 Email notifications
* 📱 SMS notifications
* 📍 Live GPS tracking
* 💳 Online payment gateway
* 📈 Advanced delivery analytics
* 📱 Mobile application
* 🔔 Real-time shipment notifications

---

## Project Highlights

* Full-stack MERN application
* Separate Customer, Staff and Admin roles
* JWT-based authentication
* Shipment tracking system
* Courier booking management
* Admin dashboard
* Dashboard and reports
* PDF generation
* REST API based backend
* MongoDB database integration

---

## Learning Outcomes

* MERN stack development
* REST API development
* MongoDB database management
* Authentication and authorization
* React frontend development
* Backend development with Node.js and Express

---

## Author

**Manisha Modi**

MERN Stack Project

---

## Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

