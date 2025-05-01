import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: process.env.DB_NAME,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Some error occurred in connecting to DB", error);
    }
};
