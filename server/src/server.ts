import express from "express";
import cors from "cors";
import "dotenv/config";
import roadmapRoutes from "./routes/roadmap.route";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoute";




const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
}

app.get("/", (req,res)=>{
    res.send("Career path is live...");
});
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/users", userRoutes);



app.listen(PORT, ()=>{
    console.log(`server running on on port ${PORT} `)
});

startServer();