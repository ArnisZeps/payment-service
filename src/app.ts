import express, { type Express } from "express";
import { createPaymentRoutes } from "./routes/payment.routes";
import { errorHandler } from "./middleware/errorHandler";
import { createPaymentsController } from "./controllers/payments.controller";

export function createApp(): Express {
    const app = express();
    app.use(express.json());
    app.use("/payments", createPaymentRoutes(createPaymentsController()));
    app.use(errorHandler);
    return app;
}