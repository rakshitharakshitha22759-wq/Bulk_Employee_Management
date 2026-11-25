# Bulk Employee Management

A full-stack MERN application for managing employee records, with search and sorting, and persistent storage in MongoDB Atlas.

## Features

- Add and delete employee records
- Search by employee name or employee code
- Sort by employee code (numeric order) and employee name (A-Z / Z-A)
- Display of the total number of employees
- REST API with data stored in MongoDB Atlas

## Tech Stack

| Layer    | Technologies                |
|----------|-----------------------------|
| Frontend | React (Vite), Axios         |
| Backend  | Node.js, Express.js         |
| Database | MongoDB Atlas, Mongoose     |

## Project Structure
backend/     Express server, routes, controllers, models
frontend/    React application


## Getting Started

### Prerequisites

- Node.js (v18 or later)
- A MongoDB Atlas cluster and connection string

### Backend
cd backend
npm install

Create a .env file in the backend folder, using .env.example as a template:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Start the server:
node server.js


### Frontend

In a second terminal:

cd frontend
npm install
npm run dev

The application runs at http://localhost:5173

## Author
Rakshitha G N 
GitHub: [rakshitharakshitha22759-wq](https://github.com/rakshitharakshitha22759-wq)
