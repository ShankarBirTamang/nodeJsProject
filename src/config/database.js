import mongoose  from "mongoose";

async function connectDB(){
    //database Connection
    try {
        const status = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected successfully!: ${status.connection.host} `);
        
    } catch (error) {
        console.log(`DB Error : ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;