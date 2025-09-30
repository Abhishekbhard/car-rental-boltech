# Car Rental Boltech 🚗

A modern, full-stack car rental platform built with cutting-edge technologies to provide seamless vehicle booking experiences.

## 🌟 Overview

Car Rental Boltech is a comprehensive car rental management system that allows users to browse available vehicles, check pricing, and make bookings with real-time availability updates. The platform features a beautiful, responsive frontend and a robust backend API.

## 🛠️ Technology Stack

### Frontend

- **React 19** - Latest React with modern hooks and concurrent features
- **TypeScript** - Type-safe development
- **Redux Toolkit & RTK Query** - State management and API caching
- **CSS Modules** - Scoped styling for component isolation
- **Vite** - Fast build tool and development server

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework with middleware support
- **TypeScript** - Type-safe backend development
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - Authentication (further improvement)
- **Swagger** - API documentation (further improvement)

### Development Tools

- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd car-rental-boltech
   ```

2. **Install backend dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../carental-frontend
   npm install
   ```

### Database Setup

1. **Start MongoDB service**

   ```bash
   # On Windows
   net start MongoDB

   # On macOS
   brew services start mongodb/brew/mongodb-community

   # On Linux
   sudo systemctl start mongod
   ```

2. **Environment Configuration**
   Create a `.env` file in the `server` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/car-rental
   PORT=3000
   JWT_SECRET=your-secret-key-here
   CORS_ORIGIN=http://localhost:5173
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd server
   npm run dev
   ```

   The API will be available at `http://localhost:3000`

2. **Start the frontend application**
   ```bash
   cd carental-frontend
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Testing

- **Run backend tests**: `cd server && npm test`
- **Run frontend tests**: `cd carental-frontend && npm run test`

## 📋 Features

### ✅ Current Features

- **Vehicle Catalog**: Browse available cars with pricing information
- **Real-time Availability**: Live stock updates after bookings
- **Booking System**: Complete booking workflow with date selection
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Error Handling**: Comprehensive error messages and validation
- **Type Safety**: Full TypeScript coverage for reliability

### 🔄 Current Limitations

- **User Authentication**: Currently uses hardcoded user selection
- **API Documentation**: No interactive API documentation
- **Component Library**: No reusable component library
- **Advanced Features**: No search filters, sorting, or advanced booking options

## 🔮 Future Enhancements

### Phase 1: Developer Experience & Documentation

#### 📚 Storybook Component Library

- **Interactive component showcase** for all UI elements
- **Design system documentation** with usage examples
- **Component development sandbox** for faster iteration
- **Visual regression testing** to prevent UI bugs

#### 🔗 Swagger API Documentation

- **Interactive API explorer** for backend endpoints
- **Request/response examples** for all API calls
- **Authentication testing** within the documentation
- **API versioning support** for future updates

### Phase 2: User Experience & Security

#### 🔐 Proper Authentication System

- **User registration and login** with email verification
- **Role-based access control** (Admin, User, Manager)
- **Secure password policies** and reset functionality
- **Session management** with JWT tokens
- **Social login options** (Google, Facebook)

#### 👤 User Profile Management

- **Personal information management**
- **Booking history and tracking**
- **Payment method storage** (PCI compliant)
- **Notification preferences**

### Phase 3: Advanced Features

#### 🎨 Custom UI Component Library

- **Design system foundation** with consistent theming
- **Accessible components** following WCAG guidelines
- **Dark mode support** with theme switching
- **Internationalization (i18n)** support
- **Performance optimized** components

#### 🔍 Enhanced Search & Filtering

- **Advanced search** by location, price, vehicle type
- **Real-time filtering** with instant results
- **Sorting options** (price, rating, distance)
- **Map integration** for location-based search

## 📁 Project Structure

```
car-rental-boltech/
├── carental-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── store/
│   │   ├── types/
│   │   └── assets/
│   ├── package.json
│   └── vite.config.ts
├── server/
│   ├── src/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── tests/
│   ├── package.json
│   └── jest.config.js
└── README.md
```
