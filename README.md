# express-api-secure
`express-api-secure` is an API security middleware for Express js that ensures your API is protected from unauthorized access. It restricts access to your data based on the client-side origin, API key, and JSON Web Token (JWT).
## Features
- **Origin-Based Security**: Restrict API access to specific client-side origins.
- **API Key Validation**: Protect endpoints using an API key.
- **JWT Authentication**: Secure your API with JWT for user authentication.
- **Configurable Security Policies**: Fine-tune security settings with options like SameSite cookies.
## Installation
To install `express-api-secure` via npm, run the following command:
```bash
npm install express-api-secure 
```
## Usage Example
### Server-Side Implementation
```javascript
const express = require('express');
const cors = require('cors');
const secure = require('express-api-secure');
const app = express();

app.use(cors({
    origin: ['http://localhost:5173'],  // Set your client-side origin
    credentials: true,
}));

// Apply express-api-secure middleware
app.use(secure({
    origin: ['http://localhost:5173'],  // Allowed client-side origin
    apiKey: 'your-api-key',             // API key for security
    tokenSecret: 'secret',              // Secret for JWT authentication
    sameSite: 'none',                   // Cookie security: 'none' | 'strict' | 'lax'
    onError: {                          // Optional error handling
        code: 401,                      // HTTP status code
        error: true,                    // Enable error response
        message: 'Permission Denied.',  // Custom error message
    },
}));

// Example API route
app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to my secure Express server.'});
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```
### Client-Side Example
```javascript
import { useEffect } from 'react';

const MyComponent = () => {
    useEffect(() => {
        fetch('http://localhost:3000/api', {
            headers: {
                'x-api-key': 'your-api-key',  // Include your API key in the request header
            },
            credentials: 'include',  // Include cookies for authentication
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }, []);
};
```
## Securing with Environment Variables
For added security, avoid hardcoding sensitive information like API keys and secrets in your code. Use environment variables instead.
### Steps:
1. Install the dotenv package in your Express server:
```bash
npm install dotenv
```
2. Create a .env file in the root of your project with the following content:
```javascript
API_KEY=your-api-key
TOKEN_SECRET=your-token-secret
```
3. Update your server code to use these environment variables:
```javascript
require('dotenv').config();

app.use(secure({
    origin: 'http://localhost:5173',       // Allowed origin
    apiKey: process.env.API_KEY,           // Use API key from .env
    tokenSecret: process.env.TOKEN_SECRET, // Use secret from .env
    sameSite: 'none',                      // Cookie security
}));
```
## License
This package is open source and available under the MIT license.
## Author
### Sejin Ahmed (MERN Stack Web Developer)
### Thank You for visiting!!!!