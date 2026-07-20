import { Request, Response } from "express";

export function createPaymentsController() {
    //
    return {
        create(req: Request, res: Response) {
            res.status(201).json({ message: "Payment created successfully" });
        },
        list(req: Request, res: Response) {
            res.status(200).json({ message: "List of payments" });
        }
    }
}