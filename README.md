# Chamoda Dewnith - Architecture Portfolio Website

A professional, modern architecture portfolio website built with React and Vite. Features a clean white background with black text, elegant typography, and showcases architectural projects beautifully.

## 🌟 Features

- **Responsive Design** - Looks perfect on all devices
- **Project Gallery** - Filterable project showcase with categories (Residential, Commercial, Public)
- **Project Details** - Dedicated pages for each project with image galleries
- **Contact Form** - Email integration with EmailJS
- **Modern UI** - Clean white background with sophisticated architectural typography
- **Smooth Navigation** - React Router for seamless page transitions
- **SEO Optimized** - Proper meta tags and semantic HTML

## 🎨 Design

- **Typography**: Playfair Display (headings) + Montserrat (body)
- **Color Scheme**: White background (#FFFFFF) with black text (#000000)
- **Layout**: Clean, minimalist design perfect for showcasing architectural work
- **Images**: High-quality architectural photography from Unsplash

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or navigate to this directory:
```bash
cd "e:\My Personal Projects\ChamodaDewnith"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

## 📧 Setting Up Email Functionality

The contact form uses EmailJS to send emails. To enable it:

1. **Create an EmailJS Account**
   - Go to [EmailJS.com](https://www.emailjs.com/)
   - Sign up for a free account

2. **Set Up Email Service**
   - Add an email service (Gmail, Outlook, etc.)
   - Note your Service ID

3. **Create Email Template**
   - Create a new email template
   - Use these variables in your template:
     - `{{name}}` - Contact's name
     - `{{email}}` - Contact's email
     - `{{phone}}` - Contact's phone
     - `{{message}}` - Contact's message
   - Note your Template ID

4. **Get Your Public Key**
   - Go to Account > API Keys
   - Copy your Public Key (User ID)

5. **Update the Contact Form**
   - Open `src/pages/Contact.jsx`
   - Replace these values around line 20:
   ```javascript
   const serviceID = 'YOUR_SERVICE_ID';
   const templateID = 'YOUR_TEMPLATE_ID';
   const userID = 'YOUR_USER_ID';
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx & .css         # Navigation header
│   ├── Footer.jsx & .css         # Footer with contact info
│   ├── Hero.jsx & .css           # Homepage hero section
│   ├── ProjectCard.jsx & .css    # Individual project cards
│   └── ProjectGallery.jsx & .css # Projects grid with filters
├── pages/
│   ├── Home.jsx                  # Homepage
│   ├── ProjectDetails.jsx & .css # Individual project pages
│   └── Contact.jsx & .css        # Contact page with form
├── data/
│   └── projects.js               # Project data
├── App.jsx                       # Main app component with routing
├── index.css                     # Global styles
└── main.jsx                      # Entry point
```

## 🎯 Customization

### Update Project Data
Edit `src/data/projects.js` to add, remove, or modify projects. Each project includes:
- Title, category, location, year, area
- Thumbnail and multiple images
- Description and key features

### Change Contact Information
Update contact details in:
- `src/components/Footer.jsx` - Footer contact info
- `src/pages/Contact.jsx` - Contact page information

### Modify Colors/Typography
Edit CSS variables in `src/index.css` to customize the design.

## 🛠️ Technologies Used

- **React** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **EmailJS** - Email functionality
- **CSS3** - Styling
- **Google Fonts** - Typography (Playfair Display, Montserrat)

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder ready for deployment.

## 🌐 Deployment

The site can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Simply upload the contents of the `dist` folder after building.

## 📝 License

This project is open source and available for personal or commercial use.

## 👤 Contact

**Chamoda Dewnith**
- Email: chamodadewnith@architect.com
- Phone: +94 77 123 4567
- Location: Colombo, Sri Lanka

---

Built with ❤️ using React + Vite

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
