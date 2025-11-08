# Admin Interface Setup Guide

This guide will help you set up the admin interface so the architect can add projects through a web form after hosting.

## Architecture Overview

- **Frontend**: React application (current folder) - deployed to Vercel/Netlify
- **Backend**: Node.js/Express API (server folder) - deployed to Render/Railway
- **Database**: MongoDB Atlas (cloud-hosted, free tier available)
- **Image Storage**: Cloudinary (cloud-hosted, free tier available)

## Step 1: Install Backend Dependencies

Open a terminal in your project and run:

```powershell
cd server
npm install
```

This will install: express, mongoose, cors, dotenv, multer, cloudinary, bcryptjs, jsonwebtoken, nodemon

## Step 2: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (select free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/)
6. Replace `<password>` with your database user password
7. Save this connection string for the next step

## Step 3: Set Up Cloudinary

1. Go to https://cloudinary.com/users/register/free
2. Create a free account
3. Go to Dashboard
4. Copy these values:
   - Cloud Name
   - API Key
   - API Secret
5. Save these for the next step

## Step 4: Create Environment File

In the `server` folder, create a file named `.env` (no extension) with this content:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/chamoda-portfolio?retryWrites=true&w=majority

# Server Port
PORT=5000

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-random-string-here-change-this

# Admin Credentials
ADMIN_USERNAME=chamoda_admin
ADMIN_PASSWORD=your-secure-password-here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Important**: 
- Replace all placeholder values with your actual credentials
- For JWT_SECRET, use a long random string (you can generate one online)
- Choose a strong admin password
- Never commit the .env file to git (it's already in .gitignore)

## Step 5: Start the Backend Server

In the `server` folder terminal:

```powershell
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected
```

## Step 6: Test the Admin Interface Locally

1. Make sure both servers are running:
   - Frontend: `npm run dev` (in main folder) → http://localhost:5173
   - Backend: `npm run dev` (in server folder) → http://localhost:5000

2. Open your browser and go to: http://localhost:5173/admin/login

3. Login with your credentials from .env file:
   - Username: chamoda_admin (or whatever you set)
   - Password: (your password from .env)

4. You should see the Admin Dashboard

5. Click "Add New Project" and test adding a project:
   - Fill in all fields
   - Upload 1-6 images
   - Click "Add Project"

6. Go back to the home page to see your new project

## Step 7: Deploy the Backend (Render - Free)

1. Create a GitHub repository for your project
2. Push all code to GitHub
3. Go to https://render.com and sign up
4. Click "New +" → "Web Service"
5. Connect your GitHub repository
6. Configure:
   - Name: chamoda-portfolio-api
   - Root Directory: server
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
7. Add Environment Variables (all the values from your .env file):
   - MONGO_URI
   - JWT_SECRET
   - ADMIN_USERNAME
   - ADMIN_PASSWORD
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
8. Click "Create Web Service"
9. Copy your deployed URL (e.g., https://chamoda-portfolio-api.onrender.com)

## Step 8: Update Frontend for Production

In your main folder, create a new file: `src/config.js`

```javascript
export const API_URL = import.meta.env.MODE === 'production' 
  ? 'https://your-backend-url.onrender.com'
  : 'http://localhost:5000';
```

Then update all API calls in your admin pages to use this:

In `AdminLogin.jsx`, `AdminDashboard.jsx`, and `AdminAddProject.jsx`, add at the top:
```javascript
import { API_URL } from '../config';
```

And replace `http://localhost:5000` with `${API_URL}`, for example:
```javascript
fetch(`${API_URL}/api/auth/login`, { ... })
```

## Step 9: Deploy the Frontend (Vercel - Free)

1. Go to https://vercel.com and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a Vite React app
5. Click "Deploy"
6. Your site will be live at: https://your-project.vercel.app

## Step 10: Access the Admin Panel

After deployment:

1. Go to: https://your-project.vercel.app/admin/login
2. Login with your admin credentials
3. Add/Edit/Delete projects
4. All changes are saved to MongoDB
5. Images are uploaded to Cloudinary
6. Changes appear immediately on the live site

## How the Architect Will Use It

1. **Login**: Go to yoursite.com/admin/login
2. **Dashboard**: See all existing projects
3. **Add Project**: Click "Add New Project"
   - Fill in title, category, location, year
   - Write description
   - Upload 1-6 images
   - Mark as featured if desired
   - Choose "Published" or "Draft" status
4. **Edit Project**: Click "Edit" on any project
5. **Delete Project**: Click "Delete" on any project
6. **View Live Site**: Click "View Live Site" to see changes

## Security Notes

- Never share your .env file
- Use strong passwords
- Keep your MongoDB and Cloudinary credentials secret
- The admin panel is password-protected
- Only you (the architect) will have the login credentials

## Troubleshooting

**Backend won't start?**
- Check MongoDB connection string is correct
- Ensure all environment variables are set
- Check if port 5000 is already in use

**Can't upload images?**
- Verify Cloudinary credentials are correct
- Check image file size (max 10MB)
- Ensure you're uploading images (jpg, png, etc.)

**Login not working?**
- Check ADMIN_USERNAME and ADMIN_PASSWORD in .env
- Ensure backend server is running
- Check browser console for errors

**Projects not showing?**
- Check MongoDB connection
- Verify projects have status: "published"
- Check browser console for API errors

## Next Steps After Setup

1. Update ProjectGallery.jsx to fetch from API instead of static data
2. Test the full flow: Login → Add Project → View on homepage
3. Add more features if needed (edit project, categories, etc.)

## Cost Summary

- MongoDB Atlas (Free Tier): 512MB storage
- Cloudinary (Free Tier): 25GB storage, 25GB bandwidth
- Render (Free Tier): Backend hosting
- Vercel (Free Tier): Frontend hosting

**Total Cost: $0/month** for small portfolios
