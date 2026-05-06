export const SHAPE_TYPES = ["point", "rectangle"];

export const shapeValidator = {

    validateCreate(data) {
        const { type, x, y, width, height } = data;

        if (!SHAPE_TYPES.includes(type)) {
            return {
                message: "Le type doit être 'point' ou 'rectangle'",
                field: "type"
            };
        }

        if (typeof x !== "number" || typeof y !== "number") {
            return {
                message: "x et y doivent être des nombres",
                field: "x/y"
            };
        }

        if (type === "rectangle") {
            if (typeof width !== "number" || typeof height !== "number") {
                return {
                    message: "la largeur et la hauteur doivent être des nombres",
                    field: "width/height"
                };
            }

            if (width <= 0 || height <= 0) {
                return {
                    message: "la largeur et la hauteur doivent être supérieures à 0",
                    field: "width/height"
                };
            }
        }

        return null;
    }
};