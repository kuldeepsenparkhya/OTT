# OTT Platform APIs

This project provides the backend APIs for an OTT (Over-The-Top) platform. It allows users to access, manage, and interact with various features of the platform, including user authentication, movie and TV show management, subscription plans, and more.

## Features

- User authentication (signup, login, logout)
- CRUD operations for movies and TV shows
- Management of subscription plans
- User subscription management
- Review and rating system for content

## Technologies Used

- TypeScript
- Node.js
- Express.js
- MongoDB with Mongoose

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js
- npm or yarn
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:kuldeepsenparkhya/OTT.gitl
  
- cd OTT-platform-APIs
- npm install

2. PORT=3000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>

3. Start the server:

- npm start

- The server will start at http://localhost:5000 by default.


PI Endpoints
Authentication
POST /api/auth/signup: User signup
POST /api/auth/login: User login
POST /api/auth/logout: User logout
Movies
GET /api/movies: Get all movies
GET /api/movies/:id: Get a single movie by ID
POST /api/movies: Create a new movie
PUT /api/movies/:id: Update a movie by ID
DELETE /api/movies/:id: Delete a movie by ID
TV Shows
GET /api/tv-shows: Get all TV shows
GET /api/tv-shows/:id: Get a single TV show by ID
POST /api/tv-shows: Create a new TV show
PUT /api/tv-shows/:id: Update a TV show by ID
DELETE /api/tv-shows/:id: Delete a TV show by ID
Subscription Plans
GET /api/plans: Get all subscription plans
GET /api/plans/:id: Get a single subscription plan by ID
POST /api/plans: Create a new subscription plan
PUT /api/plans/:id: Update a subscription plan by ID
DELETE /api/plans/:id: Delete a subscription plan by ID
User Subscription
POST /api/users/:userId/subscribe: Subscribe to a plan
POST /api/users/:userId/unsubscribe: Unsubscribe from a plan

