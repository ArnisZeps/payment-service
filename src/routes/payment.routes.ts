import { Router } from "express";
import type { createPaymentsController } from "../controllers/payment.controller";

export function createPaymentRoutes(
    controller: ReturnType<typeof createPaymentsController>
): Router {
    const router = Router();

    router.post("/", controller.create);
    router.get("/", controller.list);

    return router;
}