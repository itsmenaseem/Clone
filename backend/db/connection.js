import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
 async function connection(){
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1) ;    
    }
}

export default connection;