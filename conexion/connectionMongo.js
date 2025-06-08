const mongoose = require('mongoose');
const mongoDB = async (MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Database name:', mongoose.connection.name);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = mongoDB;