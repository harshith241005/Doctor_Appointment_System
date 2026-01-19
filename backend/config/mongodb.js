import mongoose from "mongoose";

/**
 * MongoDB Connection Configuration
 * @author Harsh
 * @description Establishes connection to MongoDB database for MediBook application
 */
const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('✅ MongoDB Connected Successfully');
            console.log(`📦 Database: medibook`);
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB Connection Error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB Disconnected');
        });

        await mongoose.connect(`${process.env.MONGODB_URI}/medibook`);
    } catch (error) {
        console.error('❌ Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectDB;

// Note: Avoid using '@' symbol in your database user's password