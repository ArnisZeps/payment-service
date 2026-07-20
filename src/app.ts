import express, { type Express } from "express";
import { errorHandler } from "./middleware/errorHandler";

export function createApp(): Express {
    const app = express();
    app.use(express.json());
    app.use(errorHandler);
    return app;
}