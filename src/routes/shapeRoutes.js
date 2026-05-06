import express from "express";
import { createShape, getArea, getShape } from "../controllers/shapeController.js";
const router = express.Router()

router.post("/shapes", createShape)
router.get("/shapes", getShape)
router.get("/shapes/:id/area", getArea)

export default router;