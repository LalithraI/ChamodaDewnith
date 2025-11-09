# Quick Deployment Commands

# Step 1: Build the project locally to test
npm run build

# Step 2: Test the build locally
npm run preview

# Step 3: Commit all changes
git add .
git commit -m "Ready for deployment - Updated API URLs for production"

# Step 4: Push to GitHub
git push origin main

# Step 5: Deploy backend to Render
# - Go to https://render.com
# - Create new Web Service from GitHub
# - Select 'server' as root directory
# - Add all environment variables from server/.env
# - Deploy!

# Step 6: Deploy frontend to Netlify
# Option 1 - Via Netlify Dashboard:
# - Go to https://app.netlify.com
# - Import project from GitHub
# - Add environment variable: VITE_API_URL=<your-render-backend-url>
# - Deploy!

# Option 2 - Via Netlify CLI:
netlify login
netlify init
netlify deploy --prod

# Step 7: Set up custom domain (optional)
# In Netlify: Site settings > Domain management > Add custom domain
# Enter: chamodadewnith.netlify.app (or your custom domain)

# Your site will be live at:
# https://chamodadewnith.netlify.app
