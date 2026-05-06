export const shapeService = {

    area(shape) {
        if (shape.type === "rectangle") {
            return shape.width * shape.height;
        }

        return null;
    },

    translate(shape, dx, dy) {
        return {
            ...shape,
            x: shape.x + dx,
            y: shape.y + dy
        };
    },

};
