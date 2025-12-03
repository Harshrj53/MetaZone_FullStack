# MetaZone E-Commerce Platform

MetaZone is a full-stack e-commerce application built with React, Node.js, Express, and MySQL.

## Features

- **User Authentication**: JWT-based auth with HttpOnly cookies.
- **Product Management**: Browse, search, and filter products by category.
- **Shopping Cart**: Add items, update quantities, and remove items.
- **Checkout System**: Place orders with shipping address and payment method.
- **Referral System**: Unique referral codes for users to earn credits.
- **Discount Codes**: Apply promo codes during checkout.
- **Admin Dashboard**: Manage products, categories, and view orders.
- **Chatbot**: Integrated AI assistant for user queries.
- **Responsive Design**: Beautiful UI built with Tailwind CSS.

## Tech Stack

- **Frontend**: React (Vite), Redux Toolkit, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express, Sequelize ORM, MySQL
- **Database**: MySQL

## Prerequisites

- Node.js (v14+)
- MySQL Server

## Setup Instructions

### 1. Database Setup

Ensure your MySQL server is running. Create a database named `metazone` (or whatever you configured in `.env`).

The application is configured to use the following default credentials (update `backend/.env` if needed):
- **Host**: localhost
- **User**: root
- **Password**: (empty)
- **Database**: metazone

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Seed the database (creates tables and initial data):
   ```bash
   node seeder.js
   ```
   *Note: This creates an admin user: `admin@metazone.com` / `admin123`*

4. Start the server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

## Usage

1. Open your browser and go to `http://localhost:5173`.
2. **Sign Up** for a new account or **Login** with the admin credentials (`admin@metazone.com` / `admin123`).
3. Explore products, add to cart, and checkout.
4. Use the **Chatbot** for help.
5. Access the **Admin Dashboard** (only for admin users) to manage the platform.

## Project Structure

```
metazone/
├── backend/
│   ├── src/
│   │   ├── config/         # DB config
│   │   ├── controllers/    # Route logic
│   │   ├── middlewares/    # Auth & error handling
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API routes
│   │   └── app.js          # Express app setup
│   ├── index.js            # Entry point
│   └── seeder.js           # Database seeder
└── frontend/
    ├── src/
    │   ├── api/            # Axios setup
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   ├── redux/          # State management
    │   ├── App.jsx         # Main app component
    │   └── main.jsx        # Entry point
```
