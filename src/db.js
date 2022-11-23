import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

const url = `mongodb+srv://ruswkdbs:${process.env.MONGODB_PASSWORD}@cluster0.liw2iwz.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(`mongoDB connected`));
  
const db = mongoose.connection;

db.on("error", (error) => {
    console.log(error);
})
db.on("open", () => {
    console.log("mongodb : localhost is connected");
})