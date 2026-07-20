import express, { type Express } from "express";
import { createPaymentRoutes } from "./routes/payment.routes";
import { errorHandler } from "./middleware/errorHandler";
import { createPaymentsController } from "./controllers/payments.controller";
import { createPaymentService } from "./services/payment.service";
import type { PaymentRepository } from "./repositories/payment.repository";

export function createApp(repository: PaymentRepository): Express {
    const app = express();
    app.use(express.json());

    const service = createPaymentService(repository);
    const controller = createPaymentsController(service);
    app.use("/payments", createPaymentRoutes(controller));
    app.use(errorHandler);
    return app;
}