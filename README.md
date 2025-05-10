# Elite Hiring Task API

A robust Node.js/Express.js API with MongoDB integration, featuring authentication, company management, and tool usage tracking.

## Features

- 🔐 JWT-based Authentication
- 👥 User Management with Role-based Access
- 🏢 Company Management with Usage Plans
- 🛠️ Tool Usage Tracking
- 📊 Usage Analytics
- 🛡️ Rate Limiting and Abuse Detection
- 📝 Comprehensive Logging

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd elite-hiring-task
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=4000
HOST=0.0.0.0
MONGO_URI=mongodb://localhost:27017/elite-hiring-task
JWT_SECRET_KEY=your_jwt_secret_key
```

4. Start the server:

```bash
npm start
```

## API Endpoints

### Authentication Routes (`/api/auth`)

- **POST /signup**

  - Create a new user account
  - Body: `{ name, email, password, role, companyId }`

- **POST /login**

  - Authenticate user
  - Body: `{ email, password }`

- **POST /logout**
  - Logout user and blacklist token

### Company Routes (`/api/company`)

- **POST /create**
  - Create a new company
  - Body: `{ name, plan }`
  - Plans: Free, Pro, Enterprise

### Tool Routes (`/api/tool`)

- **POST /use-tool**
  - Use a tool (requires authentication)
  - Protected by rate limiting and usage limits

## Database Schema

### User Model

```typescript
{
	name: string;
	email: string;
	password: string;
	role: string;
	companyId: ObjectId;
}
```

### Company Model

```typescript
{
  name: string;
  plan: string;
  usageCount: number;
  users: ObjectId[];
}
```

### Usage Log Model

```typescript
{
	userId: ObjectId;
	toolName: string;
	prompt: string;
	aiResponse: string;
	timestamp: Date;
}
```

## Security Features

1. **JWT Authentication**

   - Token-based authentication
   - Token blacklisting for logout
   - Role-based access control

2. **Rate Limiting**

   - API rate limiting
   - Abuse detection
   - Usage limits based on company plan

3. **Security Middleware**
   - CORS configuration
   - Request logging
   - Error handling

## Optimization Guidelines

1. **Database Optimization**

   - Use indexes on frequently queried fields
   - Implement caching for frequently accessed data
   - Use MongoDB aggregation for complex queries

2. **API Performance**

   - Implement pagination for large datasets
   - Use compression middleware
   - Optimize response payload size

3. **Security Best Practices**

   - Regularly rotate JWT secret keys
   - Implement request validation
   - Use environment variables for sensitive data

4. **Monitoring and Logging**
   - Use Winston logger for structured logging
   - Monitor API performance
   - Track error rates and patterns

## Development

### Scripts

- `npm start`: Start the server
- `npm run dev`: Start the server in development mode
- `npm run build`: Build the TypeScript code
- `npm test`: Run tests

### Project Structure

```
src/
├── controllers/    # Request handlers
├── models/        # Database models
├── routes/        # API routes
├── middleware/    # Custom middleware
├── services/      # Business logic
├── utils/         # Utility functions
├── enum/          # TypeScript enums
├── database.ts    # Database configuration
└── server.ts      # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
