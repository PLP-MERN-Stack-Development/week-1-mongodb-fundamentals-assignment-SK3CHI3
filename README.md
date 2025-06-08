# MongoDB Fundamentals Assignment

A Node.js application demonstrating MongoDB operations including CRUD, advanced queries, aggregation pipelines, and indexing.

## Features Implemented

- Basic CRUD Operations on a books collection
- Advanced queries with filtering, sorting, and projection
- Aggregation pipelines for data analysis
- Database indexing for performance
- Sample dataset of books

## Project Structure

```
src/
  ├── config/
  │   └── db.js         # MongoDB connection configuration
  ├── insert_books.js   # Sample data insertion script
  ├── queries.js        # MongoDB queries implementation
  └── show_db_state.js  # Database state visualization
```

## Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure MongoDB:
   - Ensure MongoDB is running locally
   - Update `.env` file if needed (default: mongodb://localhost:27017/)

3. Initialize database:

   ```bash
   npm run init-db
   ```

## Available Scripts

- `npm run init-db` - Initialize database with sample books
- `npm start` - Run the queries demonstration

## Sample Database Output

Here's the current state of the books collection:

```
┌─────────┬─────────────────────────┬───────────────────────┬───────────────────┬──────┬───────┬────────┐
│ Title                   │ Author                │ Genre             │ Year │ Price │ Rating │
├─────────────────────────┼───────────────────────┼───────────────────┼──────┼───────┼────────┤
│ The Great Gatsby       │ F. Scott Fitzgerald  │ Fiction          │ 1925 │ 11.99 │ 4.5    │
│ To Kill a Mockingbird  │ Harper Lee          │ Fiction          │ 1960 │ 12.99 │ 4.8    │
│ 1984                   │ George Orwell       │ Science Fiction  │ 1949 │ 10.99 │ 4.7    │
│ Pride and Prejudice    │ Jane Austen        │ Romance          │ 1813 │  8.99 │ 4.6    │
│ The Hobbit            │ J.R.R. Tolkien     │ Fantasy          │ 1937 │ 14.99 │ 4.9    │
└─────────┴─────────────────────────┴───────────────────────┴───────────────────┴──────┴───────┴────────┘
```