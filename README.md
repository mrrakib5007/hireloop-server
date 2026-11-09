# HireLoop Server

## Description
HireLoop Server is the backend REST API service for HireLoop — a modern job board and talent platform. Built with Node.js and Express using ES Modules, it powers database interactions, data management, and core API operations connecting job seekers, recruiters, and administrators.

## Technology
- Runtime: Node.js (ES Modules)
- Framework: Express.js (v5)
- Database: MongoDB (Official Node.js Driver)
- Middleware: CORS, Express JSON parser
- Environment Management: Dotenv
- Development Tool: Nodemon

## Features
- RESTful API Architecture: Clean and scalable API structure for platform services
- Database Connection: Connection to MongoDB (`hireloop_db`) using the official driver
- Data Collections: Collections for managing users, role-based data, and core platform workflows
- Cross-Origin Resource Sharing: Configured CORS for communication with the Next.js client
- Environment Configuration: Secure handling of port and database connection credentials
- Health Check Endpoint: Root route (`/`) for uptime verification and deployment monitoring

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas or local MongoDB instance

### Installation
1. Navigate to the server directory:
   ```bash
   cd hireloop-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the server:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```
