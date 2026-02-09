const { connectToDatabase, getDb } = require('./db');
const questionsData = require('./questionsData');

async function seedDatabase() {
    try {
        await connectToDatabase();
        const db = getDb();
        const collection = db.collection('questions');

        console.log(`Checking existing questions in database...`);
        const count = await collection.countDocuments();

        if (count > 0) {
            console.log(`Database already has ${count} questions.`);
            console.log(`Do you want to clear and re-seed? (Currently exiting to be safe)`);
            process.exit(0);
        }

        console.log(`Starting to seed ${questionsData.length} questions to MongoDB...`);

        // Insert in batches to be safe, though insertMany handles large arrays well
        const result = await collection.insertMany(questionsData);

        console.log(`Successfully inserted ${result.insertedCount} questions!`);
        console.log(`Database seeding complete.`);
        process.exit(0);

    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();
