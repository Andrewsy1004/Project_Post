import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO);
        console.log("Bd connected");
    } catch (error) {
        throw new Error("Error to connect to DB: " + error)
    }
}
