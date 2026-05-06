import express from "express";
import { createShape, deleteShape, getArea, getShape } from "../controllers/shapeController.js";
const router = express.Router()

router.post("/shapes", createShape)
router.get("/shapes", getShape)
router.get("/shapes/:id/area", getArea)
router.delete("/shapes/:id", deleteShape)
export default router;
