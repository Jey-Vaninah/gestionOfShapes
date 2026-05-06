import express from "express";
import { createShape, deleteShape, getArea, getShape, translate, updateShape } from "../controllers/shapeController.js";
const router = express.Router()

router.post("/shapes", createShape)
router.get("/shapes", getShape)
router.get("/shapes/:id/area", getArea)
router.delete("/shapes/:id", deleteShape)
router.put("/shapes/:id", updateShape)
router.post("/shapes/:id/translate", translate)
router.get("/shapes/collide", getShape)
export default router;
