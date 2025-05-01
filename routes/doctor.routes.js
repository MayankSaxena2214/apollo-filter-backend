import express from "express";
import { createDoctor, getAllDoctors } from "../controllers/doctor.controller.js";


export const doctorRouter=express.Router();

doctorRouter.get("/all-doctors",getAllDoctors);
doctorRouter.post("/new",createDoctor);