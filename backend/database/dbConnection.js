import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("Database Connection Error: ", error.message);
        process.exit(1);  // Exits the app if database connection fails
    }
};

export default dbConnection;
