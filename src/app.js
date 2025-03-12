import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoute.js';
import userRoutes from './routes/userRoute.js';
import bodyParser from 'body-parser';
import connectDB from './config/database.js';

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("/",(req , res)=>{
    res.json({
        status:"OK",
        version:"1.0.0",
        port : port
    })
})

app.use("/api/products",productRoutes);
app.use("/api/users",userRoutes);




app.listen(port,()=>{
    console.log(`Server started at port ${port}...`);
});