import type { Payment } from "../types/payment.types";

export interface PaymentRepository {
    save(payment: Payment): boolean;
    findById(paymentId: string): Payment | null;
    findAll(): Payment[];
}