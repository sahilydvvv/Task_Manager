# Smart Task Manager

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

-   **User Authentication**: Secure Signup and Login using JWT and HTTP-only cookies.
-   **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
-   **Filtering & Sorting**: Filter tasks by status (Pending, In Progress, Completed) and priority (Low, Medium, High).
-   **Search**: Search tasks by title.
-   **Analytics**: View task statistics and progress.
-   **Responsive Design**: Built with Tailwind CSS for a modern, mobile-friendly UI.

## Tech Stack

-   **Frontend**: React, Vite, Tailwind CSS, Axios, React Router.
-   **Backend**: Node.js, Express.js, Mongoose.
-   **Database**: MongoDB.
-   **Authentication**: JSON Web Tokens (JWT), bcryptjs.

## Prerequisites

-   Node.js (v14 or higher)
-   MongoDB (Atlas or Local)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sahilydvvv/Task_Manager.git
    cd Smart-task-manager
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory with the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    NODE_ENV=development
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../frontend
    npm install
    ```

## Running the Application

1.  **Start the Backend:**
    ```bash
    cd backend
    npm run dev
    ```
    The server will start on `http://localhost:5000`.

2.  **Start the Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173` (or 5174 if 5173 is busy).

## API Endpoints

### Auth
-   `POST /api/auth/signup` - Register a new user
-   `POST /api/auth/login` - Login user
-   `POST /api/auth/logout` - Logout user
-   `GET /api/auth/me` - Get current user info

### Tasks
-   `POST /api/tasks/createTask` - Create a new task
-   `GET /api/tasks/getTasks` - Get all tasks (with filters)
-   `PATCH /api/tasks/updateTask/:taskId` - Update a task
-   `DELETE /api/tasks/deleteTask/:taskId` - Delete a task
-   `GET /api/tasks/analytics` - Get task analytics

## License

This project is open source.
