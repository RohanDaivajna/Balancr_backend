# Balancr Backend

Balancr Backend is a Node.js/Express REST API for managing user authentication, income, and expense tracking, with support for file uploads and Excel export.

## Features

- User registration and authentication (JWT)
- Income and expense CRUD operations
- Dashboard with summary statistics
- Upload and serve profile images
- Export income and expense data to Excel
- MongoDB database integration

## Project Structure

```
.
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── server.js
├── package.json
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/Balancr_backend.git
    cd Balancr_backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add:
    ```
    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLIENT_URL=http://localhost:8000
    ```

4. Start the server:
    ```sh
    npm run dev
    ```

## API Endpoints

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/getUser` - Get user info (auth required)
- `POST /api/v1/auth/upload-image` - Upload profile image
- `POST /api/v1/income/add` - Add income (auth required)
- `GET /api/v1/income/get` - Get all income (auth required)
- `GET /api/v1/income/downloadexcel` - Download income as Excel (auth required)
- `DELETE /api/v1/income/:id` - Delete income (auth required)
- `POST /api/v1/expense/add` - Add expense (auth required)
- `GET /api/v1/expense/get` - Get all expenses (auth required)
- `GET /api/v1/expense/downloadexcel` - Download expenses as Excel (auth required)
- `DELETE /api/v1/expense/:id` - Delete expense (auth required)
- `GET /api/v1/dashboard/` - Get dashboard data (auth required)

## License

ISC

---

**Note:** Update the MongoDB connection string and JWT secret in your `.env` file before running the server.