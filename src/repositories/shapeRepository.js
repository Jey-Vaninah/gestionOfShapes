import { fsUtils } from "../utils/fs-utils.js"
import { v4 as uuidv4 } from "uuid";

export const shapeRepository = {

    findAll() {
        return fsUtils.read();
    },

    findById(id) {
        const shapes = fsUtils.read();
        return shapes.find(shp => shp.id === id) || null
    },

    findByCriteria(filters) {
        const shapes = fsUtils.read();

        return shapes.filter(shp => {
            return Object.entries(filters).every(([key, value]) => {

                if (key === "minX") return shp.x >= Number(value);
                if (key === "maxX") return shp.x <= Number(value);
                if (key === "minY") return shp.y >= Number(value);
                if (key === "maxY") return shp.y <= Number(value);

                if (typeof shp[key] === "string") {
                    return shp[key].toLowerCase() === String(value).toLowerCase();
                }

                return Number(shp[key]) === Number(value);
            });
        });
    },

    save(shape) {
        const shapes = fsUtils.read();

        const newShapes = {
            id: uuidv4(),
            ...shape
        };

        shapes.push(newShapes);
        fsUtils.write(shapes);
        return newShapes;
    },

    update(id, newShape) {
        const shapes = fsUtils.read();

        const index = shapes.findIndex(shp => shp.id === id);
        if (index === -1) return null

        shapes[index] = {
            id,
            ...newShape
        };
        fsUtils.write(shapes);
        return shapes[index];
    },

    delete(id) {
        const shapes = fsUtils.read();
        const filtered = shapes.filter(shp => shp.id !== id);

        if (filtered.length === shapes.length) {
            return false;
        }

        fsUtils.write(filtered);
        return true;
    }

}