import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200,
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`Origin: ${req.get('Origin') || 'No Origin'}`);
    console.log(`Path: ${req.path}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);
    next();
});

app.use( authRoutes);
app.use(errorHandler);
app.all("", (req, res) => {
    console.log("here", req)
    res.json({ message: "Hello world" });
});


export default app;