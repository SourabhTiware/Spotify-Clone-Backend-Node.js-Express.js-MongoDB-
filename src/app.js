import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoutes from "./routes/auth.routes.js";
import musicRouter from "./routes/music.routes.js"


const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());


    app.use("/api/auth", authRoutes);
    app.use("/api/music", musicRouter);



export default app;