# Deployment Guide - Netlify & Render

## 🚀 Complete Deployment Steps

### Part 1: Deploy Backend to Render (FREE)

1. **Create a Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `chamodadewnith-api`
     - **Root Directory**: `server`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

3. **Add Environment Variables** (in Render dashboard)
   ```
   MONGO_URI=mongodb+srv://Lalithra:Richmond31@cluster0.zttxarv.mongodb.net/?appName=Cluster0
   PORT=5000
   JWT_SECRET=2ad5337dceec3c0cfc703f868c68f5eb
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   CLOUDINARY_CLOUD_NAME=dtykljbgj
   CLOUDINARY_API_KEY=296324186513753
   CLOUDINARY_API_SECRET=FnLiCvOJyBmFVGArtP8Se1h9JhY
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL: `https://chamodadewnith-api.onrender.com`

---

### Part 2: Deploy Frontend to Netlify (FREE)

#### Option A: Deploy via GitHub (Recommended)

1. **Push to GitHub**
   ```powershell
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Netlify Account**
   - Go to https://app.netlify.com/signup
   - Sign up with GitHub

3. **Import Your Project**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your repository: `ChamodaDewnith`
   - Configure build settings:
     - **Base directory**: (leave empty)
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

4. **Add Environment Variable**
   - Go to Site settings → Environment variables
   - Add new variable:
     - **Key**: `VITE_API_URL`
     - **Value**: `https://chamodadewnith-api.onrender.com` (your Render URL)

5. **Deploy Site**
   - Click "Deploy site"
   - Wait for build to complete (2-5 minutes)

6. **Set Custom Domain**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter: `chamodadewnith.netlify.app`
   - Or use a custom domain if you have one

#### Option B: Deploy via Netlify CLI (Quick)

1. **Install Netlify CLI**
   ```powershell
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```powershell
   netlify login
   ```

3. **Build Your Project**
   ```powershell
   npm run build
   ```

4. **Deploy**
   ```powershell
   netlify deploy --prod
   ```
   - Choose "Create & configure a new site"
   - Site name: `chamodadewnith`
   - Publish directory: `dist`

---

### Part 3: Update API URLs in Code

After deploying backend, update the API URL:

1. **Update src/config.js** (already created):
   - Replace `'https://your-backend-url.onrender.com'` 
   - With your actual Render URL

2. **Set Environment Variable in Netlify**:
   - Site settings → Environment variables
   - `VITE_API_URL` = `https://chamodadewnith-api.onrender.com`

---

### Part 4: Custom Domain Setup (Optional)

#### If you want `chamodadewnith.com`:

1. **Buy Domain** (from Namecheap, GoDaddy, etc.)

2. **In Netlify**:
   - Site settings → Domain management
   - Add custom domain → Enter `chamodadewnith.com`
   - Copy the DNS records shown

3. **In Your Domain Provider**:
   - Add these DNS records:
     ```
     Type: A
     Name: @
     Value: 75.2.60.5

     Type: CNAME
     Name: www
     Value: chamodadewnith.netlify.app
     ```

4. **Wait for DNS Propagation** (1-48 hours)

#### If you just want free `.netlify.app`:

- Your site will be: `chamodadewnith.netlify.app`
- You can customize the subdomain in Netlify settings

---

### Part 5: Verify Deployment

1. **Check Backend**: Visit `https://chamodadewnith-api.onrender.com/api/health`
   - Should return: `{"status":"ok","message":"Server is running"}`

2. **Check Frontend**: Visit `https://chamodadewnith.netlify.app`
   - Website should load
   - Projects should appear
   - Contact form should work

3. **Test Admin Panel**: 
   - Go to `https://chamodadewnith.netlify.app/admin/login`
   - Login with your credentials
   - Add a test project
   - Verify it appears on homepage

---

### 📝 Important Notes

1. **Free Tier Limitations**:
   - Render: Backend sleeps after 15 min inactivity (first request takes ~30s)
   - Netlify: 100GB bandwidth/month, 300 build minutes/month
   - MongoDB Atlas: 512MB storage

2. **Environment Variables**:
   - NEVER commit `.env` file to GitHub
   - Always use environment variables in hosting platforms

3. **Continuous Deployment**:
   - Both Netlify and Render auto-deploy when you push to GitHub
   - Make changes → Git push → Auto-deploy

4. **Backend URL**:
   - After deploying backend, you MUST update `VITE_API_URL` in Netlify
   - Redeploy frontend after backend URL changes

---

### 🆘 Troubleshooting

**Projects not loading?**
- Check if `VITE_API_URL` is set in Netlify environment variables
- Check browser console for CORS errors
- Verify backend is running on Render

**Admin login not working?**
- Ensure backend environment variables are set correctly
- Check Network tab in browser DevTools for API errors

**Images not uploading?**
- Verify Cloudinary credentials in Render environment variables
- Check Cloudinary dashboard for upload logs

**"Failed to fetch" errors?**
- Backend might be sleeping (Render free tier)
- Wait 30 seconds and try again
- Check backend logs in Render dashboard

---

### 🎉 Your URLs After Deployment

- **Website**: https://chamodadewnith.netlify.app
- **Admin Panel**: https://chamodadewnith.netlify.app/admin/login
- **Backend API**: https://chamodadewnith-api.onrender.com
- **API Health Check**: https://chamodadewnith-api.onrender.com/api/health

---

### Next Steps After Deployment

1. Share website URL with clients
2. Add projects through admin panel
3. Monitor analytics in Netlify dashboard
4. Set up custom domain (optional)
5. Enable HTTPS (automatic on Netlify)
6. Set up form notifications (Netlify Forms)

---

**Total Cost**: $0/month (completely free!)
**Deployment Time**: ~20-30 minutes total
**Maintenance**: Auto-updates when you push to GitHub
