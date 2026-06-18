# TrendMarket — Project Documentation

## TrendMarket
**Project Documentation**  
*A MERN Stack Web Application for E-Commerce Shopping and Catalog Management*  
**Prepared by:** Suraparaju Baavya sree  
**Page 1**

---

## 1. Introduction

### 1.1 Project Title
TrendMarket

### 1.2 Team Members
* **Name:** Suraparaju Baavya sree
* **Role:** Full Stack Developer (Frontend, Backend, Database, Documentation)

*This is an individually developed project, with the sole contributor responsible for end-to-end design, development, testing, and deployment of the application.*

---

## 2. Project Overview

### 2.1 Purpose
The **TrendMarket** online marketplace is a web-based e-commerce application that allows consumers to discover, search, and purchase trendy items securely. The platform connects two types of users: ordinary shoppers who browse the catalog and place orders, and store administrators who manage the inventory catalog, view sales analytics, and update order statuses.

The goal of the project is to provide a zero-friction transaction workflow for customers while giving merchants real-time insight into stock levels and sales metrics via a centralized digital panel.

### 2.2 Key Features

#### User Registration & Profile Management
* Secure sign-up using name, email, and password, with passwords encrypted using `bcryptjs` before storage.
* Secure login session management utilizing JSON Web Tokens (JWT) stored in HttpOnly cookies to prevent script-based token theft.
* Profile page allowing users to view and update their personal details and review order histories.

#### Product Catalog & Dynamic Discovery
* Customers browse a grid display of trend products with images, ratings, descriptions, and dynamic stock badges ("In Stock" or "Out of Stock").
* Interactive search and filtering allowing users to search products by name and filter instantly by category.

#### Persistent Cart & Multi-Step Checkout
* Shoppers can add products to a cart, modify quantities, and remove items with cart state persisted across page refreshes.
* Guided wizard checkout flow including Shipping Form validation, Payment method selection, and Order Placement confirmation.

#### Admin Control Dashboard
* Secure admin route checks preventing non-admin accounts from opening inventory control pages.
* Complete CRUD operations allowing admins to add products, modify prices, edit descriptions, change pictures, and delete listings.
* An interactive dashboard summarizing total sales revenue, customer registrations, and order counts.
* Live stock warning page alerting admins when product counts drop below 5 items.

---

## 3. Architecture
The application follows the MERN stack architecture (MongoDB, Express.js, React, Node.js) in a client-server configuration communicating over RESTful APIs.

### 3.1 Frontend Architecture (React)
The frontend is built using React with Vite as the build tool, configured with role-based routing.
* **Component-Based Structure:** Modular elements ([Navbar.jsx](file:///c:/Smart%20Bridge/frontend/src/components/Navbar.jsx), [ProductItem.jsx](file:///c:/Smart%20Bridge/frontend/src/components/ProductItem.jsx)) are separated from page-level layouts ([Home.jsx](file:///c:/Smart%20Bridge/frontend/src/pages/Home.jsx), [Cart.jsx](file:///c:/Smart%20Bridge/frontend/src/pages/Cart.jsx), [Dashboard.jsx](file:///c:/Smart%20Bridge/frontend/src/pages/admin/Dashboard.jsx)).
* **Client Routing:** React Router DOM manages path navigation, with custom [ProtectedRoute.jsx](file:///c:/Smart%20Bridge/frontend/src/components/ProtectedRoute.jsx) components preventing unauthorized access to the admin dashboard.
* **State Management:** Local inputs use `useState`, while global states (cart products, login credentials, search queries) are shared across the app using a React Context API provider ([ShopContext.jsx](file:///c:/Smart%20Bridge/frontend/src/context/ShopContext.jsx)).
* **API Requests:** Axios handles HTTP requests directed at the backend, sending cookies automatically for secure cookie-based session verification.

### 3.2 Backend Architecture (Node.js + Express.js)
The backend exposes a REST API built with Express.js running on Node.js. It is structured into models, controllers, middleware, and routes.
* **Models:** Mongoose schemas define collections in MongoDB ([userModel.js](file:///c:/Smart%20Bridge/backend/models/userModel.js), [productModel.js](file:///c:/Smart%20Bridge/backend/models/productModel.js), [orderModel.js](file:///c:/Smart%20Bridge/backend/models/orderModel.js)).
* **Middleware:** Auth middleware ([authMiddleware.js](file:///c:/Smart%20Bridge/backend/middleware/authMiddleware.js)) decrypts the JWT token inside incoming HttpOnly request cookies, verifying session validity. Global error handler ([errorMiddleware.js](file:///c:/Smart%20Bridge/backend/middleware/errorMiddleware.js)) handles API exceptions gracefully.
* **Routes:** Separate routers divide server endpoints logically ([authRoutes.js](file:///c:/Smart%20Bridge/backend/routes/authRoutes.js), [productRoutes.js](file:///c:/Smart%20Bridge/backend/routes/productRoutes.js), [orderRoutes.js](file:///c:/Smart%20Bridge/backend/routes/orderRoutes.js)).

### 3.3 Database (MongoDB)
MongoDB stores application documents across three main collections, connected via Mongoose Object ID references.

| Collection | Key Fields | Purpose |
| :--- | :--- | :--- |
| **users** | `name`, `email`, `password`, `isAdmin` | Stores account details, hashed passwords, and admin status flags. |
| **products** | `name`, `image`, `category`, `description`, `price`, `countInStock`, `rating` | Stores product details, pricing, and live inventory levels. |
| **orders** | `user`, `orderItems`, `shippingAddress`, `paymentMethod`, `totalPrice`, `isPaid` | Stores transaction summaries, purchased items, and shipping destinations. |

---

## 4. Setup Instructions

### 4.1 Prerequisites
* Node.js (v18 or later) and npm
* MongoDB Atlas cloud cluster or local MongoDB database
* Git client

### 4.2 Installation Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd TrendMarket
   ```
2. Set up the backend environment variables. Create a `.env` file inside the [backend](file:///c:/Smart%20Bridge/backend/) folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/trendmarket
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```
3. Install dependencies and seed initial product catalog data:
   ```bash
   cd backend
   npm install
   # Database auto-seeds on first launch if empty
   ```
4. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

---

## 5. Folder Structure

### 5.1 Client (Frontend) Structure
```
frontend/src/
├── components/
│   ├── Navbar.jsx          - Dynamic header with cart counters and profile dropdowns
│   └── ProtectedRoute.jsx  - Route guard checking admin permissions
├── context/
│   └── ShopContext.jsx     - Shared catalog, login status, and cart Context Provider
├── pages/
│   ├── Home.jsx            - Main product grid catalog and search filters
│   ├── ProductDetail.jsx   - Single product details and cart action buttons
│   ├── Cart.jsx            - Shopping cart quantity modifier list
│   ├── Shipping.jsx        - Shipping shipping form details
│   ├── Payment.jsx         - Payment gateways selector form
│   ├── PlaceOrder.jsx      - Final checkout review and order submissions
│   ├── Profile.jsx         - Profile editors and buyer order history lists
│   └── admin/
│       ├── Dashboard.jsx   - Central admin stats and order trackers
│       └── StockDetail.jsx - Active stock lists showing alerts
```

### 5.2 Server (Backend) Structure
```
backend/
├── config/
│   └── db.js            - MongoDB connection loader
├── middleware/
│   ├── authMiddleware.js  - Decrypts JWT cookies and parses roles
│   └── errorMiddleware.js - Express exception error catcher
├── models/
│   ├── userModel.js     - User model and Bcrypt hashing methods
│   ├── productModel.js  - Product schema definition
│   └── orderModel.js    - Order schema linking products and users
├── routes/
│   ├── authRoutes.js    - Authentication routes
│   ├── productRoutes.js - Product listings routes
│   └── orderRoutes.js   - Order creation and status updating routes
├── server.js            - Express main server file
```

---

## 6. Running the Application
Run both servers concurrently in separate terminals:

### 6.1 Start Backend Server
```bash
cd backend
npm run dev
```
*Backend runs on `http://localhost:5000`, logging "MongoDB Connected successfully" once connected.*

### 6.2 Start Frontend Client
```bash
cd frontend
npm run dev
```
*Frontend runs on Vite development server at `http://localhost:5173`.*

---

## 7. API Documentation

### 7.1 Authentication Routes — `/api/auth`
* **POST `/api/auth/register`:** Register a new shopper.
* **POST `/api/auth/login`:** Authenticates user and sets HttpOnly cookie.
* **POST `/api/auth/logout`:** Clears auth cookie.
* **GET `/api/auth/profile`:** Fetch logged-in user profile details.

### 7.2 Product Routes — `/api/products`
* **GET `/api/products`:** Fetch all products.
* **GET `/api/products/:id`:** Fetch a single product by ID.
* **POST `/api/products`:** Create a new product (Admin Only).
* **PUT `/api/products/:id`:** Edit product details/stock (Admin Only).
* **DELETE `/api/products/:id`:** Delete a product listing (Admin Only).

### 7.3 Order Routes — `/api/orders`
* **POST `/api/orders`:** Submit shipping details and place an order.
* **GET `/api/orders/myorders`:** Fetch order history for the logged-in buyer.
* **GET `/api/orders/:id`:** Fetch order details by ID.

---

## 8. Authentication
The application uses JSON Web Tokens (JWT) for stateless session handling.
* **Password Security:** Passwords are encrypted with `bcryptjs` before DB write.
* **Cookie-Based Sessions:** Upon login, the signed JWT is attached to an HttpOnly cookie. Browser JS cannot read this token, preventing token theft.
* **Express Gatekeeping:** Backend routers run `authMiddleware` on protected API calls to verify cookie signatures before returning payload data.

---

## 9. User Interface
The application features a responsive design:
1. **Catalog Showcase:** Dynamic listing grid with product cards.
2. **Details Page:** Detailed views showing star reviews and live inventory badges.
3. **Cart List:** Interactive list showing subtotal calculations.
4. **Admin Panel:** Tabular lists displaying low stock alerts.

---

## 10. Testing
* **Manual Testing:** End-to-end user flows tested across registration, additions, payment steps, order placement, and admin stock modifications.
* **Database Inspection:** MongoDB Compass used to verify document creations and relations.
* **Security Validation:** Verified that route access is denied with 401/403 status responses when cookies are missing or user is not flagged as admin.

---

## 11. Known Issues
* **Simulated Payments:** The payment screen only simulates transactions and does not charge live credit cards.
* **Invoice Emails:** The current prototype version does not send automated emails to users after order placements.

---

## 12. Future Enhancements
* Stripe Payment Gateway Integration.
* Automated invoice emails using Nodemailer.
* Live WebSocket order updates on the admin dashboard.
* Product image upload endpoints using Multer and Cloudinary.
