import express, { Express } from "express";
import { config } from "dotenv";
import cors from "cors";
import { router } from "./routes";

export const app: Express = express();

config();
config({ path: ".env.local", override: true });

app.use(cors({
    origin: [
        "https://julian-1301.github.io",
        "https://julian-1301.github.io",
        "http://localhost:3000",
        "http://localhost:5173"
    ],
    credentials: true
}));
app.use(express.json());

app.use("/", router);

const port: number = (process.env.PORT || 8080) as number;

app.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`);
});