# 🛒 E-Commerce Website

A modern and responsive E-Commerce Web Application built using React.js, Tailwind CSS, Firebase, Cloudinary and Razorpay.

The application provides a complete shopping experience including user authentication, product browsing, cart management, checkout, online payment and order management.

---

## 🚀 Features

- 🔐 User Registration & Login
- 🔥 Firebase Authentication
- 🛍️ Product Listing & Product Details
- 📱 Category-based Products
- 🛒 Add to Cart / Remove from Cart
- ➕ Increase / Decrease Product Quantity
- 💰 Automatic Cart & Order Total Calculation
- 📦 Checkout & Order Management
- 💳 Razorpay Test Payment Integration
- ☁️ Cloudinary Product Image Upload
- 🔥 Firebase Firestore Database
- 👤 User Profile
- 📋 My Orders
- 🎠 Product Carousel
- 📱 Responsive UI
- ❌ 404 Page Handling

---

## 🛠️ Tech Stack

- Frontend: React.js, JavaScript, HTML, CSS
- Styling: Tailwind CSS
- Authentication: Firebase Authentication
- Database: Firebase Firestore
- Image Management: Cloudinary
- Payment Gateway: Razorpay
- Routing: React Router
- Icons: React Icons
- Version Control: Git & GitHub

  ---

## 🔄 Application Flow

```text
Login / Signup
      ↓
   Home Page
      ↓
Browse Products
      ↓
Product Details
      ↓
   Add to Cart
      ↓
     Cart
      ↓
   Checkout
      ↓
Razorpay Payment
      ↓
Order Confirmation
      ↓
   My Orders
```

   ---

## 🔥 Firebase

Firebase is used for:

- User Authentication
- Firestore Database
- Product data
- Cart data
- Order data
- User-specific data management

  ---

## 💳 Payment Integration

The project uses Razorpay Test Mode for payment processing.

```text
Checkout
   ↓
Shipping Details
   ↓
Razorpay Checkout
   ↓
Test Payment
   ↓
Payment ID
   ↓
Order Stored in Firestore
   ↓
Order Confirmation
```

«Note: Razorpay is currently configured for testing/demo purposes.»

---

## ☁️ Cloudinary

Cloudinary is used for product image uploading and image management.

```text
Select Image
     ↓
Image Validation
     ↓
Cloudinary Upload
     ↓
Image URL
     ↓
Product Data → Firestore
```

---

## 📁 Project Structure

```text
src/
│
├── components/
│   ├── AddProduct.js
│   ├── Banner.js
│   ├── Cart.js
│   ├── CartCard.js
│   ├── Home.js
│   ├── Layout.js
│   ├── Login.js
│   ├── Navbar.js
│   ├── Signup.js
│   ├── UserProfile.js
│   │
│   └── product-components/
│       ├── AllProductPage.js
│       ├── Checkout.js
│       ├── Confirmation.js
│       ├── MyOrder.js
│       ├── ProductContainer.js
│       ├── ProductSlider.js
│       ├── SliderProductCard.js
│       └── SpecificProductPage.js
│
├── firebaseConfigs/
│   └── FirebaseConfigs.js
│
├── App.js
├── App.css
└── index.js
```

---

## 🔑 Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/abhi9-git-hub/ecommerce-website.git
```

2. Open project folder:

```bash
cd ecommerce-website
```

3. Install dependencies

   ```bash
   npm install
   ```
4. Start the development sever

   ```bash
   npm start
   ```
   ### The application will run at:

   ```bash
   https://localhost:3000
   ```

---

## 🧠 Key Learning

Through this project, I gained practical experience in:

- React component-based development
- React Hooks
- React Router
- Firebase Authentication
- Firestore CRUD operations
- User-specific data handling
- Cloudinary image uploading
- Payment gateway integration
- Form handling and validation
- Cart & order management
- Responsive UI development
- Git & GitHub

  ---

## 👨‍💻 Developer

Abhinav Tripathi
GitHub: https://github.com/abhi9-git-hub/ecommerce-website.git

---

## 🌐 Live Demo

🔗 Live Website: YOUR_LIVE_WEBSITE_URL

