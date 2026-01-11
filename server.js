import  express from 'express'
import  dotenv from 'dotenv'
import {connectDB} from './lib/connectDB.js'
import resumeRouter from "./routes/resume.route.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/",resumeRouter)
// Get the client

app.listen(PORT, async() => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
