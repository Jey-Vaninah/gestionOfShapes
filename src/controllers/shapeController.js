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
        height: type === "rectangle" ? height : null
    }

    shapeRepository.save(newShape);
    res.status(201).json(newShape);
}

export const getShape = (req, res) => {
    const result = shapeRepository.findByCriteria(req.query);
    res.json(result)
}

export const getArea = (req, res) => {
    const { id } = req.params;
    const shape = shapeRepository.findById(id);

    if (!shape) {
        return res.status(404).json({ message: "Shape introuvable" });
    }

    if (shape.type === "point") {
        const area = 0;

        return res.json({
            id: shape.id,
            type: shape.type,
            area
        });
    }

    if (shape.type === "rectangle") {
        const area = shape.width * shape.height;

        return res.json({
            id: shape.id,
            type: shape.type,
            area
        });
    }
    return res.status(400).json({ message: "Type non supporté" });
}

export const updateShape = (req, res) => {
    const id = (req.params.id);

    const error = shapeValidator.validateCreate(req.body);
    if (error) {
        return res.status(400).json(error);
    };

    const existing = shapeRepository.findById(id);
    if (!existing) {
        return res.status(404).json({ message: "Not found" });
    }

    const { type, x, y, width, height } = req.body;

    const updated = {
        id,
        type,
        x,
        y,
        width: type === "rectangle" ? width : null,
        height: type === "rectangle" ? height : null
    };

    shapeRepository.update(id, updated);

    res.json(updated);
};

export const deleteShape = (req, res) => {
    const success = shapeRepository.delete(req.params.id);

    if (!success) {
        return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted" });
};

export const translate = (req, res) => {
    const id = req.params.id
    const shape = shapeRepository.findById(id);
    const { dx, dy } = req.query
    const newX = shape.x + Number(dx);
    const newY = shape.y + Number(dy);
    const updated = {
        ...shape,
        x: newX,
        y: newY
    };
    shapeRepository.update(id, updated);
    res.json(updated);
}

