const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/";
// For MongoDB Atlas, use your connection string instead
// const uri = "mongodb+srv://<username>:<password>@<cluster-url>/plp_bookstore";

async function insertBooks() {
    const client = await MongoClient.connect(uri);
    const db = client.db("plp_bookstore");
    const booksCollection = db.collection("books");

    const booksData = [
        {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Literary Fiction",
            published_year: 1925,
            price: 12.99,
            in_stock: true,
            pages: 180,
            publisher: "Scribner"
        },
        {
            title: "1984",
            author: "George Orwell",
            genre: "Science Fiction",
            published_year: 1949,
            price: 14.99,
            in_stock: true,
            pages: 328,
            publisher: "Secker and Warburg"
        },
        {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Literary Fiction",
            published_year: 1960,
            price: 13.99,
            in_stock: true,
            pages: 281,
            publisher: "J. B. Lippincott & Co."
        },
        {
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            genre: "Fantasy",
            published_year: 1937,
            price: 15.99,
            in_stock: true,
            pages: 310,
            publisher: "Allen & Unwin"
        },
        {
            title: "Dune",
            author: "Frank Herbert",
            genre: "Science Fiction",
            published_year: 1965,
            price: 16.99,
            in_stock: true,
            pages: 412,
            publisher: "Chilton Books"
        },
        {
            title: "Pride and Prejudice",
            author: "Jane Austen",
            genre: "Romance",
            published_year: 1813,
            price: 11.99,
            in_stock: true,
            pages: 432,
            publisher: "T. Egerton, Whitehall"
        },
        {
            title: "The Catcher in the Rye",
            author: "J.D. Salinger",
            genre: "Literary Fiction",
            published_year: 1951,
            price: 13.99,
            in_stock: false,
            pages: 234,
            publisher: "Little, Brown and Company"
        },
        {
            title: "Neuromancer",
            author: "William Gibson",
            genre: "Science Fiction",
            published_year: 1984,
            price: 14.99,
            in_stock: true,
            pages: 271,
            publisher: "Ace"
        },
        {
            title: "The Name of the Wind",
            author: "Patrick Rothfuss",
            genre: "Fantasy",
            published_year: 2007,
            price: 18.99,
            in_stock: true,
            pages: 662,
            publisher: "DAW Books"
        },
        {
            title: "Project Hail Mary",
            author: "Andy Weir",
            genre: "Science Fiction",
            published_year: 2021,
            price: 24.99,
            in_stock: true,
            pages: 496,
            publisher: "Ballantine Books"
        }
    ];

    try {
        await booksCollection.deleteMany({}); // Clear existing documents
        const result = await booksCollection.insertMany(booksData);
        console.log(`Successfully inserted ${result.insertedCount} books`);
    } catch (err) {
        console.error('Error inserting books:', err);
    } finally {
        await client.close();
    }
}

// Run the insertion
insertBooks().catch(console.error);
