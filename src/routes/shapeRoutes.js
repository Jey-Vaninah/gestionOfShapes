import express from "express";
import { createShape, getShape } from "../controllers/shapeController.js";
const router = express.Router()

router.post("/shapes", createShape)
router.get("/shapes", getShape)

export default router;