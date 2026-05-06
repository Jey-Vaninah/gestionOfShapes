import express from "express";
import { createShape } from "../controllers/shapeController.js";
const router = express.Router()

router.post("/shapes", createShape)

export default router;