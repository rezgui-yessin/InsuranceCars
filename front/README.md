# AutoSure - Car Insurance Platform

A modern, full-featured car insurance platform built with **Angular 18** and **Bootstrap 5**.

## 🚀 Features

### Public Landing Website
- **Modern Landing Page** with hero section, services, testimonials
- **About Us** page
- **Insurance Plans** page (Basic, Premium, Full Coverage)
- **Contact Us** page
- Fully responsive design

### Authentication System
- Login with role-based redirection
- User registration
- Forgot password functionality
- Secure authentication guards

### Role-Based Dashboards

#### Admin Dashboard
- Complete system control
- Manage clients, agents, cars, policies, claims, payments
- Statistics and analytics
- Reports generation
- System settings

#### Client Dashboard
- Personal insurance portal
- View and manage policies
- Submit and track claims
- Upload documents
- Payment history
- Buy new insurance
- Renew existing policies

#### Agent Dashboard
- Manage assigned clients
- Create and manage policies
- Review and update claims
- Commission overview

## 🛠️ Technology Stack

- **Framework**: Angular 18 (Standalone Components)
- **UI Library**: Bootstrap 5
- **Icons**: Bootstrap Icons
- **Routing**: Lazy-loaded modules with guards
- **State Management**: RxJS with Services
- **Forms**: Reactive Forms with validation

## 📁 Project Structure

```
src/app/
├── core/
│   ├── services/       # Auth, Car, Policy, Claim, Payment services
│   ├── guards/         # Auth and Role guards
│   └── interceptors/   # HTTP interceptors
├── shared/
│   ├── components/     # Navbar, Footer, Sidebar
│   └── models/         # TypeScript interfaces and enums
├── features/
│   ├── landing/        # Public pages (Home, About, Plans, Contact)
│   ├── auth/           # Login, Register, Forgot Password
│   ├── admin/          # Admin dashboard and features
│   ├── client/         # Client dashboard and features
│   └── agent/          # Agent dashboard and features
└── assets/
    └── images/         # Application images
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   cd front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

## 🔐 Demo Credentials

The application uses mock authentication. Use these emails to test different roles:

- **Admin**: `admin@autosure.com` (password: any 6+ characters)
- **Agent**: `agent@autosure.com` (password: any 6+ characters)
- **Client**: `client@autosure.com` (password: any 6+ characters)

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth animations and transitions
- Card-based layouts
- Professional color palette (blue/purple gradient)
- Bootstrap Icons integration
- Hover effects and micro-interactions
- Dark sidebar navigation
- Clean and intuitive UI/UX

## 📊 Core Modules

### Clients Module
- Full name, email, phone, address
- Driving license information
- CRUD operations

### Cars Module
- Brand, model, year
- Plate number and VIN
- Client association
- Image support

### Policies Module
- Policy number and type (Basic/Premium/Full Coverage)
- Start and end dates
- Price and status tracking
- Client and car association

### Claims Module
- Claim number and description
- Status tracking (Pending, Under Review, Approved, Rejected, Paid)
- Document upload support
- Amount tracking

### Payments Module
- Invoice management
- Payment status and method
- Transaction history

## 🔒 Security Features

- Route guards (AuthGuard, RoleGuard)
- Role-based access control
- Protected routes
- Secure authentication flow

## 🚧 Future Enhancements

- Backend API integration
- Real-time notifications
- Advanced analytics and charts
- Document management system
- Email notifications
- Payment gateway integration
- Multi-language support
- Dark mode toggle

## 📝 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Lint the code

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Developer

Built with ❤️ using Angular 18 and Bootstrap 5

---

**Note**: This application uses mock data and services. To connect to a real backend, replace the mock services in `src/app/core/services/` with actual HTTP calls to your API.
