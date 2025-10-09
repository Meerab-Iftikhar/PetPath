import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import dbConnection from "./database/dbConnection.js";
import {errorMiddleware} from "./error/error.js";
import adoptionRoutes from "./routes/adoptionRoutes.js";
import adoptingRoutes from "./routes/adoptingRoutes.js"
//const dbConnection = require("./database/dbConnection.js")
//dotenv.config();
const app = express()
dotenv.config({path: "./config/.env"});


app.use(
    cors({
    origin:[process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

dbConnection();

app.use("/api/adoption", adoptionRoutes);
app.use("/api/adopting", adoptingRoutes); 

app.use(errorMiddleware)  
 
export default app;