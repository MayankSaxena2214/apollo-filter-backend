import express from "express";
import { getSignedUrl } from "../controllers/storage.controller.js";

export const storageRouter=express.Router();

storageRouter.post("/generate-signed-url",getSignedUrl);