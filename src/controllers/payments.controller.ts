import { request, response } from "express";

export function createPaymentsController() {
    //
    return {
        create(req = request, res = response) {
            res.status(201).json({ message: "Payment created successfully" });
        },
        list(req = request, res = response) {
            res.status(200).json({ message: "List of payments" });
        }
    }
}