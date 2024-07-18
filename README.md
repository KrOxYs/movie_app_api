# 🎬Movie App API
## Overview
This project is a Movie App API that provides secure authentication, email verification, movie management, and subscription features. It leverages several technologies to ensure a robust, scalable, and efficient system.

Features
### ✅ Authentication: JWT-based secure authentication.
### 📧 Email Verification: Integrated NodeMailer for email verification.
### 🎥 Movie Management: Endpoints to manage movies, casts, directors, and genres.
### 🔍 Advanced Movie Retrieval: Filtering, sorting, searching, and pagination.
### 💳 Subscriptions: Integrated with Midtrans payment gateway.
### 📦 Containerization: Utilized Docker for containerization.
### ⚡ Caching: Leveraged Redis for caching.
### ☁️ Cloud Storage: Used Microsoft Azure for cloud storage.
### 🗄️ Database Management: Implemented MySQL and used Sequelize ORM.

Technologies Used
### Node.js: Backend runtime environment
### Express.js: Web framework for Node.js
### JWT: JSON Web Tokens for authentication
### NodeMailer: For sending verification emails
### Docker: For containerization
### Redis: For caching
### Microsoft Azure: For cloud storage
### MySQL: For database management
### Sequelize: ORM for MySQL
### Midtrans: For payment gateway integration
Installation
1. Clone the repository
```
git clone https://github.com/yourusername/movie-app-api.git
cd movie-app-api
```
3. Install dependencies
```
npm install
```
3. Set up environment variables
Create a .env file in the following the .env.example
4. Run Docker containers
```
docker-compose up -d
```
5. Run migrations
```
npx sequelize db:migrate
```
6. Start the server
```
npm start
```





