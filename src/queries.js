const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/";
// For MongoDB Atlas, use your connection string instead
// const uri = "mongodb+srv://<username>:<password>@<cluster-url>/plp_bookstore";

async function runQueries() {
    const client = await MongoClient.connect(uri);
    const db = client.db("plp_bookstore");
    const booksCollection = db.collection("books");

    try {
        // Task 2: Basic CRUD Operations
        console.log('\n--- Basic CRUD Operations ---');
        
        // Find all books in Science Fiction genre
        console.log('\nBooks in Science Fiction genre:');
        const sciFiBooks = await booksCollection.find({ genre: "Science Fiction" }).toArray();
        console.log(sciFiBooks);

        // Find books published after 2010
        console.log('\nBooks published after 2010:');
        const recentBooks = await booksCollection.find({ published_year: { $gt: 2010 } }).toArray();
        console.log(recentBooks);

        // Find books by specific author
        console.log('\nBooks by J.R.R. Tolkien:');
        const authorBooks = await booksCollection.find({ author: "J.R.R. Tolkien" }).toArray();
        console.log(authorBooks);

        // Update price of a specific book
        console.log('\nUpdating price of The Hobbit:');
        const updateResult = await booksCollection.updateOne(
            { title: "The Hobbit" },
            { $set: { price: 17.99 } }
        );
        console.log(updateResult);

        // Task 3: Advanced Queries
        console.log('\n--- Advanced Queries ---');

        // Find books that are both in stock and published after 2010
        console.log('\nIn-stock books published after 2010:');
        const inStockRecent = await booksCollection.find({
            in_stock: true,
            published_year: { $gt: 2010 }
        }).toArray();
        console.log(inStockRecent);

        // Projection to return only title, author, and price
        console.log('\nBooks with projection:');
        const projectedBooks = await booksCollection.find(
            {},
            { projection: { _id: 0, title: 1, author: 1, price: 1 } }
        ).toArray();
        console.log(projectedBooks);

        // Sort books by price (ascending)
        console.log('\nBooks sorted by price (ascending):');
        const sortedBooksAsc = await booksCollection.find().sort({ price: 1 }).toArray();
        console.log(sortedBooksAsc);

        // Pagination example (5 books per page, page 1)
        console.log('\nPagination (page 1):');
        const page1 = await booksCollection.find()
            .skip(0)
            .limit(5)
            .toArray();
        console.log(page1);

        // Task 4: Aggregation Pipeline
        console.log('\n--- Aggregation Pipeline ---');

        // Average price by genre
        console.log('\nAverage price by genre:');
        const avgPriceByGenre = await booksCollection.aggregate([
            {
                $group: {
                    _id: "$genre",
                    averagePrice: { $avg: "$price" }
                }
            }
        ]).toArray();
        console.log(avgPriceByGenre);

        // Author with most books
        console.log('\nAuthor with most books:');
        const authorWithMostBooks = await booksCollection.aggregate([
            {
                $group: {
                    _id: "$author",
                    bookCount: { $sum: 1 }
                }
            },
            {
                $sort: { bookCount: -1 }
            },
            {
                $limit: 1
            }
        ]).toArray();
        console.log(authorWithMostBooks);

        // Books by decade
        console.log('\nBooks grouped by decade:');
        const booksByDecade = await booksCollection.aggregate([
            {
                $group: {
                    _id: {
                        $subtract: [
                            "$published_year",
                            { $mod: ["$published_year", 10] }
                        ]
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]).toArray();
        console.log(booksByDecade);

        // Task 5: Indexing
        console.log('\n--- Indexing ---');

        // Create index on title
        await booksCollection.createIndex({ title: 1 });
        console.log('\nCreated index on title field');

        // Create compound index on author and published_year
        await booksCollection.createIndex({ author: 1, published_year: 1 });
        console.log('Created compound index on author and published_year');

        // Demonstrate index usage with explain()
        console.log('\nQuery execution plan with index:');
        const explainResult = await booksCollection.find({ title: "The Hobbit" })
            .explain("executionStats");
        console.log(JSON.stringify(explainResult, null, 2));

    } catch (err) {
        console.error('Error running queries:', err);
    } finally {
        await client.close();
    }
}

// Run all queries
runQueries().catch(console.error);
