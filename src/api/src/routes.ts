import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getConnection } from "./services/databaseService";

export const router: Router = Router();

router.get("/", (_req, res) => {
    res.json({
        hello: "world",
    });
});

router.post("/gameobject/add", asyncHandler(async (req: Request, res: Response) => {
    const { alias, name, description, type, price, hp } = req.body;

    if (!alias || !name || !description || !type) {
        return res.status(400).json({ error: "Alias, name, description, and type are required fields." });
    } else if (type === "Item" && (price === undefined || price === null || price === "")) {
        return res.status(400).json({ error: "Price is required for Items." });
    } else if (type === "Character" && (hp === undefined || hp === null || hp === "")) {
        return res.status(400).json({ error: "HP is required for Characters." });
    }

    const connection = await getConnection();
    try {

    } catch (error){
        
    }
    console.log(req.body);
    return res.sendStatus(204);
}));

