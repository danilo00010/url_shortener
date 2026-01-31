# URL Shortener

This is a ready-to-use URL Shortener API.
It was built using **Clean Architecture** and **Domain-Driven Design (DDD)** concepts.

Data is persisted in **MongoDB**, and **Redis** is used to cache and manage the unique ID counter for shortened URLs.

---

## Running the Project

To run this project, follow the steps below.

### 1) Create the `.env` file

Copy `.env.example` to `.env` and update the values according to your environment.

---

### 2) Docker Compose

Set up the required containers by running:

```bash
docker compose up -d --build
```

---

### 3) Redis Counter Initialization

To ensure an unpredictable initial value for the short URL IDs, you can manually set the Redis counter to a high random number (for example, `123456790`).

Access the Redis CLI:

```bash
docker exec -it redis redis-cli
```

Then set the initial value for the counter:

```bash
SET short_url:counter 123456790
```

Once this is done, the API is ready to be used.

---

## Testing

To run the test suite, execute:

```bash
npm run test
```

Tests are implemented across the **Domain**, **Application**, and **Infrastructure** layers, focusing on what really matters for business and system reliability.

Expected code coverage ranges:

- **Domain**: 100%
- **Application**: 85% – 95%
- **Infrastructure**: 65% – 85%

---

## API Documentation

Swagger UI is available at the `/docs` endpoint.

Default URL:

```bash
http://localhost:3000/docs
```

---

## Additional Information

This project was built with a strong focus on minimizing external libraries and frameworks.
The main goal was to rely as much as possible on **native Node.js features**, keeping the architecture clean and explicit.
