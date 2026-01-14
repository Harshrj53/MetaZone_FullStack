# MetaZone E-Commerce

A full-stack e-commerce application built with React, Vite, Tailwind CSS, Node.js, Express, and Prisma.

## Setup Instructions

### Prerequisites
- Node.js
- MySQL

### 1. Database Setup
Ensure your MySQL server is running.
Create a database named `metazone`.

### 2. Backend Setup
Navigate to the `backend` folder:
```bash
cd backend
```

Create a `.env` file (if not already created) with your database credentials:
```env
DATABASE_URL="mysql://root:password@localhost:3306/metazone"
JWT_SECRET="supersecret_jwt_key_123"
PORT=3000
```

Install dependencies and setup database:
```bash
npm install
npx prisma migrate dev --name init
npx prisma db seed
```

Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal and navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to view the application.

## Features
- **User Auth**: Register and Login.
- **Products**: Browse and view details.
- **Cart**: Add/remove items, view total.
- **Checkout**: Place orders.
- **Orders**: View order history.

## Tech Stack
- Frontend: React, Vite, Tailwind CSS v4
- Backend: Express, Prisma, MySQL
- Auth: JWT, bcrypt
