import { Request, Response } from "express";
import type { PaymentService } from "../services/payment.service";

export function createPaymentsController(service : PaymentService) {
    return {
        create(req: Request, res: Response) {
            const result = service.submit(req.body);
            switch (result.kind) {
                case 'created':
                    res.status(201).json({ message: "Payment created", payment: result.payment });
                    break;
                case 'duplicate':
                    res.status(409).json({ message: "Payment already exists", payment: result.payment });
                    break;
                case 'conflict':
                    res.status(409).json({ message: "Payment conflict", paymentId: result.paymentId });
                    break;
                case 'invalid':
                    res.status(400).json({ message: "Invalid payment data", errors: result.errors });
                    break;
            }
        },
        list(req: Request, res: Response) {
            res.status(200).json({ payments: service.list() });
        }
    }
}