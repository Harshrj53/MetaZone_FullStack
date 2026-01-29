# Deployment Guide for MetaZone

This guide covers how to deploy the MetaZone full-stack application. We recommend using **Vercel** for the frontend and **Render** or **Railway** for the backend and database.

## 1. Database Deployment (MySQL)

You need a cloud-hosted MySQL database. **Railway** or **Aiven** offers free/trial tiers.

### Option A: Railway (Recommended)
1.  Go to [Railway.app](https://railway.app/) and sign up.
2.  Click **"New Project"** -> **"Provision MySQL"**.
3.  Once created, go to the **"Variables"** or **"Connect"** tab to get your credentials:
    *   `MYSQLHOST`
    *   `MYSQLUSER`
    *   `MYSQLPASSWORD`
    *   `MYSQLPORT`
    *   `MYSQLDATABASE`

## 2. Backend Deployment (Node.js + Express)

We will use **Render** (free tier available).

1.  Push your code to a GitHub repository (if you haven't already).
2.  Go to [Render.com](https://render.com/) and sign up.
3.  Click **"New +"** -> **"Web Service"**.
4.  Connect your GitHub repository.
5.  **Root Directory**: `backend` (Important! Since your backend is in a generic folder).
6.  **Build Command**: `npm install`
7.  **Start Command**: `npm start`
8.  **Environment Variables**: Add the following (use values from Step 1):
    *   `DB_HOST`: (Your Railway Host)
    *   `DB_USER`: (Your Railway User)
    *   `DB_PASSWORD`: (Your Railway Password)
    *   `DB_NAME`: (Your Railway Database Name)
    *   `DB_PORT`: (Your Railway Port, usually 3306)
    *   `JWT_SECRET`: (Create a strong secret key)
    *   `NODE_ENV`: `production`
    *   `CORS_ORIGIN`: (Leave empty for now, update after Frontend deployment)
9.  Click **"Create Web Service"**.
10. Once deployed, copy the **Service URL** (e.g., `https://metazone-api.onrender.com`).

## 3. Frontend Deployment (React + Vite)

We will use **Vercel**.

1.  Go to [Vercel.com](https://vercel.com/) and sign up.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  **Framework Preset**: Vite
5.  **Root Directory**: Edit this and select `frontend`.
    *   **Build Command**: `npm run build` (Vercel usually detects this automatically).
    *   **Output Directory**: `dist`
6.  **Environment Variables**:
    *   `VITE_API_URL`: (Your Backend Service URL from Step 2, e.g., `https://metazone-api.onrender.com/api`)
    *   *Note: In your code, you might need to update `src/api/axios.js` to use this variable if it's not already dynamic.*
7.  Click **"Deploy"**.
8.  Once deployed, copy the **Frontend URL** (e.g., `https://metazone.vercel.app`).

## 4. Final Configuration

1.  **Update Backend CORS**:
    *   Go back to Render -> Your Web Service -> Environment.
    *   Add/Update `CORS_ORIGIN` to your Frontend URL (e.g., `https://metazone.vercel.app`).
    *   This ensures only your frontend can access the API.

2.  **Update Frontend API Base URL**:
    *   Ensure your `frontend/src/api/axios.js` looks like this to support production:
    ```javascript
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const api = axios.create({ baseURL, withCredentials: true });
    ```

3.  **Seed the Production Database**:
    *   You can run the seeder locally but pointing to the production DB, OR
    *   Add a "Build Command" in Render to run the seeder (risky if it resets data), OR
    *   Connect to the remote DB using a tool like DBeaver or MySQL Workbench and run the SQL manually.

## Troubleshooting

*   **CORS Errors**: Check if `CORS_ORIGIN` on backend matches the frontend URL exactly (no trailing slash).
*   **Database Connection**: Double-check all DB environment variables on Render.
*   **Cookies**: Since the backend and frontend are on different domains (vercel.app vs onrender.com), you might need to set `SameSite: 'None'` and `Secure: true` for cookies in `backend/src/controllers/authController.js`.

```javascript
// Update in backend/src/controllers/authController.js for production
const options = {
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Must be true for cross-site cookies
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Must be 'none' for cross-site
};
```
