const { connectToDatabase, client } = require('./config/db');

async function showDatabaseState() {
    try {
        const db = await connectToDatabase();
        const booksCollection = db.collection('books');
        
        console.log('\n=== Current Database State ===');
        const allBooks = await booksCollection.find().toArray();
        console.table(allBooks.map(book => ({
            title: book.title,
            author: book.author,
            genre: book.genre,
            year: book.year,
            price: book.price,
            rating: book.rating
        })));
        
    } catch (error) {
        console.error('Error showing database state:', error);
    } finally {
        await client.close();
    }
}

// Run the function
showDatabaseState();
