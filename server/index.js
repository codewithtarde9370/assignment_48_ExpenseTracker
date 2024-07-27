import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
dotenv.config();

const app = express();
app.use(express.json);
app.use(cors());

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URL)

    if(conn){
        console.log("MongoDB connected successfully!✅");
    }
    else{
        console.log("Failure in the DataBase Connection!❌");
    }
}
connectDB();

app.get("/", (req, res) => {
    res.json({
        message:"Welcome To The EXPENSE TRACKER APP!!"
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`)
})