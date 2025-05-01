import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import { doctorRouter } from "./routes/doctor.routes.js";
import { storageRouter } from "./routes/storage.routes.js";

dotenv.config();
export const app=express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

dbConnection();
// Routers

app.use("/api/v1/doctor",doctorRouter);
app.use("/api/v1/storage",storageRouter);



app.use(errorMiddleware);


