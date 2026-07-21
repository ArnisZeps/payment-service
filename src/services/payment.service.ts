import type { PaymentRepository } from "../repositories/payment.repository";
import type { Payment, SubmitResult } from "../types/payment.types";
import { validatePayment } from "../validator/payment.validator";

export interface PaymentService {
    submit(input: unknown): SubmitResult;
    list(): Payment[];
}

function sameContent(a: Payment, b: Payment): boolean {
    return (
        a.paymentId === b.paymentId &&
        a.amount === b.amount &&
        a.currency === b.currency &&
        a.debtorIban === b.debtorIban &&
        a.creditorIban === b.creditorIban &&
        a.reference === b.reference
    );
}

export function createPaymentService(
    repository: PaymentRepository
): PaymentService {
    return {
        submit(input) {
            const result = validatePayment(input);
            if (!result.ok) {
                return { kind: 'invalid', errors: result.errors };
            }
            const { payment } = result;
            
            const inserted = repository.save(payment);

            if (inserted) {
                return { kind: 'created', payment };
            }

            const stored = repository.findById(payment.paymentId);
            if (stored && sameContent(stored, payment)) {
                console.log('Duplicate payment submission detected:', payment.paymentId);
                return { kind: 'duplicate', payment: stored };
            }

            return { kind: 'conflict', paymentId: payment.paymentId };
        },
        list() {
            return repository.findAll();
        }
    }
}