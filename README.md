# MERN Authentication

A full-stack authentication application built using the MERN stack, featuring user registration, login, password hashing, and JWT-based authentication.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- MongoDB database integration
- Responsive React frontend
- Form validation and toast notifications

## Tech Stack

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcrypt

## Project Structure

```text
Project-1/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Server running locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Project-1
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with your own configuration:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_auth
JWT_SECRET=your_own_secure_secret
```

Replace the example JWT secret with a strong, private value. Never commit your real `.env` file.

Start the backend:

```bash
npm run dev
```

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

## Security

- Passwords are hashed before storage.
- Environment variables are used for sensitive configuration.
- Never publish real secrets, passwords, or authentication tokens.

## Learning Outcomes

This project provided hands-on practice with React, Express APIs, MongoDB, Mongoose, password hashing, JWT authentication, and Git-based version control.

## Author

Add your name and GitHub profile here.

## License

No license has been selected yet.