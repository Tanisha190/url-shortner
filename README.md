# URL Shortener API

A Node.js + Express API for shortening URLs, user authentication with JWT, and redirecting short links to the original URL.

## What This Project Includes

- User registration and login APIs
- JWT-based protected route for creating short URLs
- Base62 short code generation (with optional alias prefix)
- Redirect endpoint to open the original URL from short code
- Redis integration for caching
- MongoDB integration for persistence
- Swagger UI docs for easy API testing


## Project Structure

- `app.js` - Express app, routes, Swagger setup
- `server.js` - server bootstrap, Redis + Mongo connections
- `src/controllers` - request handlers
- `src/routes` - API routes and Swagger route docs
- `src/schema` - Mongoose models
- `src/middlewares` - JWT and rate limiter middleware
- `src/utils.js` - helper utilities (Base62 id generator)

## Environment Variables

Create `.env` in the root:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/url-shortner
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret_here
```

## Installation

```bash
npm install
```

## Run Locally

Make sure MongoDB and Redis are running, then start:

```bash
npm start
```

Health endpoint:

- `GET http://localhost:3000/`

## Swagger Documentation

Open Swagger UI:

- `http://localhost:3000/api-docs`

You can test APIs directly from there.

## API Endpoints

### Auth

- `POST /user/register`
- `POST /user/login`

### URL

- `POST /url/create` (JWT required)
- `GET /url/{alias}` (redirects to original URL)

## How To Test (Recommended Flow)

1. Register user:

```bash
curl -X POST "http://localhost:3000/user/register" \
  -H "Content-Type: application/json" \
  -d '{"name":"admin","email":"admin@gmail.com","password":"secret123"}'
```

2. Login and get token:

```bash
curl -X POST "http://localhost:3000/user/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"secret123"}'
```

3. Create short URL (use token from login):

```bash
curl -X POST "http://localhost:3000/url/create" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"longUrl":"https://example.com/some/very/long/path","alias":"promo"}'
```

4. Redirect test:

```bash
curl -i "http://localhost:3000/url/promo-ABC123"
```

If redirect target is cross-origin (for example LinkedIn), Swagger UI may show `Failed to fetch` due to browser CORS behavior even when backend redirect works.

In that case, test from terminal:

```bash
open "http://localhost:3000/url/sdrf-pj9VT0"

curl -i "http://localhost:3000/url/sdrf-pj9VT0"
```

Expected response contains:

- `HTTP/1.1 302 Found`
- `Location: <your long URL>`
