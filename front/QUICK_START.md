# 🚀 Quick Start Guide - AutoSure

## Prerequisites
- Node.js v18+ installed
- npm installed

## Installation & Running

### 1. Navigate to project directory
```bash
cd c:/Users/yassine/Desktop/InsurancePj/front
```

### 2. Install dependencies (if needed)
```bash
npm install
```

### 3. Start the development server
```bash
npm start
```

The application will be available at: **http://localhost:4200**

## 🎯 Demo Credentials

### Admin Login
- **Email**: `admin@autosure.com`
- **Password**: `password` (or any 6+ characters)
- **Access**: Full system control, manage everything

### Client Login
- **Email**: `client@autosure.com`
- **Password**: `password`
- **Access**: Personal dashboard, policies, claims, payments

### Agent Login
- **Email**: `agent@autosure.com`
- **Password**: `password`
- **Access**: Manage clients, create policies, review claims

## 📱 Features to Explore

### Public Pages (No Login Required)
1. **Home** (`/`) - Landing page with hero section
2. **About** (`/about`) - Company information
3. **Plans** (`/plans`) - Insurance plan comparison
4. **Contact** (`/contact`) - Contact form

### After Login

#### As Admin:
- View comprehensive dashboard with statistics
- Navigate through sidebar to different management sections
- See recent claims and policies

#### As Client:
- View personal dashboard
- Quick actions: Buy Insurance, Submit Claim
- Track policies and claims
- View payment history

#### As Agent:
- View agent dashboard with commission info
- Manage assigned clients
- Create and review policies
- Update claim statuses

## 🎨 What to Look For

### Design Features:
- ✨ Smooth animations on page load
- 🎨 Modern gradient backgrounds
- 🖱️ Hover effects on cards and buttons
- 📱 Fully responsive on all devices
- 🎯 Clean, professional UI

### Technical Features:
- ⚡ Fast lazy-loaded routes
- 🔒 Secure role-based access
- 🎭 Different dashboards per role
- 📊 Statistics and data visualization placeholders
- 🔄 Mock data services (ready for API)

## 🛠️ Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## 📂 Project Structure

```
src/app/
├── core/          # Services, guards, interceptors
├── shared/        # Reusable components & models
├── features/      # Feature modules
│   ├── landing/   # Public pages
│   ├── auth/      # Login, register
│   ├── admin/     # Admin dashboard
│   ├── client/    # Client dashboard
│   └── agent/     # Agent dashboard
└── assets/        # Images, styles
```

## 🔧 Troubleshooting

### Port already in use?
```bash
# Kill process on port 4200
npx kill-port 4200
# Then run again
npm start
```

### Dependencies issues?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors?
- Check that all files are saved
- Restart the dev server
- Clear browser cache

## 📝 Next Steps

1. **Explore the UI** - Navigate through all pages
2. **Test Authentication** - Try different user roles
3. **Check Responsiveness** - Resize browser window
4. **Review Code** - Check the clean, organized structure
5. **Customize** - Start adding your own features

## 💡 Tips

- The application uses **mock data** - perfect for development
- All components are **standalone** (Angular 18 best practice)
- Routes are **lazy-loaded** for better performance
- **Bootstrap 5** classes used throughout
- Ready for **backend integration**

## 🎓 Learning Resources

- [Angular Documentation](https://angular.dev)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.0)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Enjoy building with AutoSure! 🚗💨**

For questions or issues, check the README.md and PROJECT_SUMMARY.md files.
