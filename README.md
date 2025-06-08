# MongoDB Bookstore Assignment

This project implements a bookstore database using MongoDB, demonstrating various MongoDB operations including CRUD, advanced queries, aggregation pipelines, and indexing.

## Prerequisites

1. MongoDB installed locally or a MongoDB Atlas account
2. Node.js installed on your system
3. npm (Node Package Manager)

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. If using MongoDB Atlas, update the connection string in both `insert_books.js` and `queries.js`

## Running the Scripts

1. First, populate the database with sample data:
   ```bash
   node insert_books.js
   ```

2. Then run the queries to see all operations in action:
   ```bash
   node queries.js
   ```

## Project Structure

- `insert_books.js`: Script to populate the database with sample book data
- `queries.js`: Contains all MongoDB queries demonstrating CRUD operations, advanced queries, aggregation pipelines, and indexing
- `package.json`: Project configuration and dependencies

## Features Implemented

1. Basic CRUD Operations
   - Insert multiple books
   - Find books by genre
   - Find books by publication year
   - Find books by author
   - Update book prices
   - Delete books

2. Advanced Queries
   - Combined conditions (in_stock and publication year)
   - Projection to select specific fields
   - Sorting by price
   - Pagination implementation

3. Aggregation Pipeline
   - Average price by genre
   - Author with most books
   - Books grouped by decade

4. Indexing
   - Single field index on title
   - Compound index on author and published_year
   - Index performance analysis using explain()

## Database Schema

Each book document contains the following fields:
- title (string)
- author (string)
- genre (string)
- published_year (number)
- price (number)
- in_stock (boolean)
- pages (number)
- publisher (string)
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
>>>>>>> 28f160ab99ae7185000c87ecadb612d423c4a6e3
