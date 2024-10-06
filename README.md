# Real Estate Agency Application

A server-side rendered (SSR) Node.js application built for managing real estate properties and agency services. This project integrates several third-party libraries to handle authentication, view rendering, and database management.

## Features

- **User Authentication**: Secure login and registration functionality using bcrypt for password hashing.
- **Session Management**: Cookie-based session management for authenticated users.
- **Property Listings**: Dynamic rendering of property listings with the ability to create, update, and delete properties.
- **Database Integration**: MongoDB for database storage using Mongoose ORM.

## Tech Stack

- **Node.js**: Backend framework to manage server logic.
- **Express.js**: Web framework to handle routing and middleware.
- **MongoDB**: NoSQL database for storing users and property data.
- **Mongoose**: ORM for MongoDB to model and interact with data.
- **EJS**: Templating engine for server-side rendering of HTML.

## Libraries Used

```json
{
  "bcrypt": "^5.1.1",           // Password hashing
  "cookie-parser": "^1.4.6",    // Handling cookies for session management
  "ejs": "^3.1.10",             // Templating engine for rendering dynamic pages
  "express": "^4.21.0",         // Web framework for routing and middleware
  "mongoose": "^8.7.0"          // MongoDB ORM for schema and data handling
}
