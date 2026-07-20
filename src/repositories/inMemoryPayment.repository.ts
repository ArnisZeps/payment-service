import type { Payment } from "../types/payment.types";
import type { PaymentRepository } from "./payment.repository";

export function createInMemoryPaymentRepository(): PaymentRepository {
    const store = new Map<string, Payment>();

    return {
        save(payment: Payment): boolean {
            if (store.has(payment.paymentId)) return false;
            store.set(payment.paymentId, payment);
            return true;
        },
        findById: (paymentId: string) => store.get(paymentId) || null,
        findall: () => [...store.values()]
    };
}