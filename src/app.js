import express from "express";
import shapeRoutes from "./routes/shapeRoutes.js";

const app = express();

app.use(express.json());

app.use(shapeRoutes);

const PORT = 3000;

app.get("/", (req, res) => {
    res.json({ message: "OK" });
});

app.listen(PORT, () => {
    console.log("start");
});