# Expense Tracker Website

This is a full-stack expense tracker web application built using the MERN stack (MongoDB, Express, React, and Node.js). The app allows users to track their daily expenses with functionalities for signing up, logging in, adding and deleting transactions, and viewing them on the home page. The project integrates various libraries on both the client and server sides to ensure a smooth user experience.

## Features

- User Authentication: Signup and login functionality with secure token-based authentication.
- Transaction Management: Add, view, and delete transactions.
- Real-time Updates: Transactions dynamically update on the home page after any action.
- Logout Functionality: Users can log out to secure their session.
- Responsive Design: The app is designed to be mobile-friendly and responsive across different screen sizes.

## Tech Stack

### Frontend (Client Side)
- React: Used to build the user interface.
- React Router DOM: Handles routing and navigation within the application.
- Axios: Manages HTTP requests to the server.
- React Hot Toast: Provides toast notifications for success, error, and info messages.

### Backend (Server Side)
- Node.js: Server-side runtime for handling requests.
- Express: Web framework for creating API routes.
- MongoDB & Mongoose: NoSQL database and ORM for storing and managing user and transaction data.
- CORS: Middleware to enable cross-origin requests.
- dotenv: Loads environment variables from .env file for better configuration management.
- Nodemon: Automatically restarts the server during development when file changes are detected.
- bcrypt: Hashes passwords securely for user authentication.

## API Endpoints

### Authentication
- POST /api/auth/signup: Register a new user.
- POST /api/auth/login: Login a user and receive a token.
Transactions
- POST /api/transactions/add: Add a new transaction.
- DELETE /api/transactions/delete/:id: Delete a specific transaction.
- GET /api/transactions: Fetch all transactions for a user.
### How It Works
- Authentication: Users can register or log in to the app. Once authenticated, the user token is stored in localStorage.
- Add Transaction: Users can add new transactions with details like amount, type (income/expense), and date.
- Delete Transaction: Users can delete any previously added transaction.

### Home Page:
- The app displays a list of all transactions on the home page, fetched from the backend using Axios.
Toast Notifications: React Hot Toast provides instant feedback for user actions like successful login, transaction addition, or deletion.
Logout: Users can securely log out from their session.

## Future Enhancements
- Add categories for expenses and income.
- Implement a filter feature by date, category, or amount.
- Add user profile management.
- Integrate charting libraries to display expense analytics.