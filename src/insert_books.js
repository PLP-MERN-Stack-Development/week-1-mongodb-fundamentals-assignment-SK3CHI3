const { connectToDatabase, client } = require('./config/db');

const sampleBooks = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925,
        genre: "Fiction",
        rating: 4.5,
        price: 9.99,
        available: true,
        pages: 180
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960,
        genre: "Fiction",
        rating: 4.8,
        price: 12.99,
        available: true,
        pages: 281
    },
    {
        title: "1984",
        author: "George Orwell",
        year: 1949,
        genre: "Science Fiction",
        rating: 4.7,
        price: 10.99,
        available: true,
        pages: 328
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813,
        genre: "Romance",
        rating: 4.6,
        price: 8.99,
        available: false,
        pages: 432
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        year: 1937,
        genre: "Fantasy",
        rating: 4.9,
        price: 14.99,
        available: true,
        pages: 310
    }
];

async function insertBooks() {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('books');
        
        // Drop the collection if it exists
        await collection.drop().catch(() => console.log('Collection did not exist'));
        
        // Insert the sample books
        const result = await collection.insertMany(sampleBooks);
        console.log(`Successfully inserted ${result.insertedCount} books`);
        
    } catch (error) {
        console.error('Error inserting books:', error);
    } finally {
        await client.close();
    }
}

insertBooks();
