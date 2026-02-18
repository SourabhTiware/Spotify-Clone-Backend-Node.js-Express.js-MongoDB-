import mongoose from "mongoose";


const connectDB = async () =>{
    try {

        console.log("Wating for the Database connection ");
        
        await mongoose.connect(process.env.MONGO_URL)

        console.log("Database Connection  successfully");
    } catch (error) {
        console.error("Database connection error", error);
    }
};


export default connectDB;