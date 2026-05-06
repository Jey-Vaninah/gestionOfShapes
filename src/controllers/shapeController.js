import { v4 as uuidv4 } from "uuid";
import { shapeValidator } from "../validators/shapeValidator.js";
import { shapeRepository } from "../repositories/shapeRepository.js";

export const createShape = (req, res) => {
    const error = shapeValidator.validateCreate(req.body);

    if (error) {
        return res.status(400).json(error);
    };

    const { type, x, y, width, height } = req.body

    const newShape = {
        id: uuidv4(),
        type,
        x,
        y,
        width: type === "rectangle" ? width : null,
        heigth: type === "rectangle" ? height : null
    }

    shapeRepository.save(newShape);
    res.status(201).json(newShape);
}

export const getShape = (req, res) => {
    const result = shapeRepository.findByCriteria(req.query);
    res.json(result)
}