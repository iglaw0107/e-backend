# E-Commerce Backend API

A RESTful backend for an e-commerce platform built with Node.js, Express, and MongoDB.

## Tech Stack
- Node.js + Express 5
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Features
- User registration and login with JWT
- Role-based access (admin / user)
- Product CRUD with category support
- Cart management
- Order placement and cancellation
- Product search with pagination and filters
- Review and rating system

## Getting Started

### Prerequisites
- Node.js >= 20
- MongoDB URI

### Installation
```bash
git clone <your-repo-url>
cd ecommerce-backend
npm install
```

### Environment Variables
Create a `.env` file:
    put these thing into this file 

    PORT
    DB
    SECRET_KEY




### Run
```bash
npm run dev
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login user |

### Products
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /p1/products/search | Public | Search products |
| GET | /p1/products | Auth | Get all products |
| POST | /p1/products/create | Admin | Create product |
| PUT | /p1/products/:id | Admin | Update product |
| DELETE | /p1/products/:id | Admin | Delete product |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /p1/cart | Add to cart |
| GET | /p1/cart | Get cart |
| PUT | /p1/cart | Update quantity |
| DELETE | /p1/cart/:productId | Remove item |

### Orders
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /p1/orders | Auth | Place order |
| GET | /p1/orders/my | Auth | My orders |
| PUT | /p1/orders/:id/cancel | Auth | Cancel order |
| GET | /p1/orders/orders | Admin | All orders |
| PUT | /p1/admin/orders/:id/status | Admin | Update status |





## File Structure

ecommerce-backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── cart.controller.js
│   ├── category.controller.js
│   ├── order.controller.js
│   ├── product.controller.js
│   └── review.controller.js       ← new
├── middleware/
│   ├── adminMiddleware.js
│   ├── authMiddleware.js
│   ├── rateLimiter.js              ← new
│   └── validate.js                 ← new
├── models/
│   ├── User.js
│   ├── cart.js
│   ├── category.js
│   ├── order.js
│   ├── product.js
│   └── review.js                   ← new
├── routes/
│   ├── authRoutes.js
│   └── product.routes.js
├── validators/
│   ├── auth.validator.js           ← new
│   └── product.validator.js        ← new
├── .env
├── .gitignore
├── app.js
├── index.js
└── README.md                       ← fill this in



