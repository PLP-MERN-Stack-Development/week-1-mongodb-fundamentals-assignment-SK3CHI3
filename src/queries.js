const { connectToDatabase, client } = require('./config/db');

// This file will contain your MongoDB queries for the assignment
// Add your queries here as you complete the tasks

async function task1_findAllBooks() {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('books');
        
        // Your query here
        const books = await collection.find({}).toArray();
        console.log('All books:', books);
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

// Example of how to run a task
// task1_findAllBooks();

async function runQueries() {
    try {
        const db = await connectToDatabase();
        const booksCollection = db.collection('books');

        // 1. Basic CRUD Operations
        console.log('\n--- Basic CRUD Operations ---');

        // CREATE: Insert a new book
        const newBook = {
            title: "The Catcher in the Rye",
            author: "J.D. Salinger",
            year: 1951,
            genre: "Fiction",
            rating: 4.3,
            price: 11.99,
            available: true,
            pages: 234
        };
        const insertResult = await booksCollection.insertOne(newBook);
        console.log('Insert Result:', insertResult);

        // READ: Find all books by a specific author
        const authorBooks = await booksCollection.find({ author: "J.R.R. Tolkien" }).toArray();
        console.log('\nBooks by Tolkien:', authorBooks);

        // UPDATE: Update book price
        const updateResult = await booksCollection.updateOne(
            { title: "The Great Gatsby" },
            { $set: { price: 11.99 } }
        );
        console.log('\nUpdate Result:', updateResult);

        // DELETE: Delete a book
        const deleteResult = await booksCollection.deleteOne({ title: "The Catcher in the Rye" });
        console.log('\nDelete Result:', deleteResult);

        // 2. Advanced Queries
        console.log('\n--- Advanced Queries ---');

        // Filter with multiple conditions
        const advancedQuery = await booksCollection.find({
            year: { $gt: 1900 },
            price: { $lt: 15 },
            available: true
        }).toArray();
        console.log('\nBooks after 1900, under $15, and available:', advancedQuery);

        // Projection - only show title and author
        const projectionQuery = await booksCollection.find(
            {},
            { projection: { _id: 0, title: 1, author: 1 } }
        ).toArray();
        console.log('\nTitles and Authors only:', projectionQuery);

        // Sorting by rating descending
        const sortedBooks = await booksCollection.find()
            .sort({ rating: -1 })
            .toArray();
        console.log('\nBooks sorted by rating:', sortedBooks);

        // 3. Aggregation Pipeline
        console.log('\n--- Aggregation Pipeline ---');

        // Average price by genre
        const avgPriceByGenre = await booksCollection.aggregate([
            {
                $group: {
                    _id: "$genre",
                    averagePrice: { $avg: "$price" },
                    count: { $sum: 1 }
                }
            }
        ]).toArray();
        console.log('\nAverage price by genre:', avgPriceByGenre);

        // Most expensive book per genre
        const expensiveByGenre = await booksCollection.aggregate([
            {
                $group: {
                    _id: "$genre",
                    mostExpensiveBook: { $max: "$price" },
                    bookTitle: {
                        $first: "$title"
                    }
                }
            }
        ]).toArray();
        console.log('\nMost expensive book by genre:', expensiveByGenre);

        // 4. Create Indexes
        console.log('\n--- Creating Indexes ---');
        
        // Create indexes for common queries
        await booksCollection.createIndex({ title: 1 });
        await booksCollection.createIndex({ author: 1 });
        await booksCollection.createIndex({ genre: 1 });
        
        // Show all indexes
        const indexes = await booksCollection.indexes();
        console.log('\nCreated indexes:', indexes);

    } catch (error) {
        console.error('Error running queries:', error);
    } finally {
        await client.close();
    }
}

// Run all queries
runQueries();
