export type Currency = "USD" | "EUR" | "GBP";

export interface Payment {
    paymentId: string;
    amount: number;
    currency: Currency;
    debtorIban: string;
    creditorIban: string;
    reference?: string | null;
}

export interface ValidationError {
    field: string;
    message: string;
}

export type ValidationResult =
    | { ok: true, payment: Payment }
    | { ok: false, errors: ValidationError[] };

export type SubmitResult = 
    | { kind: 'created'; payment: Payment }
    | { kind: 'duplicate'; payment: Payment }
    | { kind: 'conflict'; paymentId: string }
    | { kind: 'invalid'; errors: ValidationError[] };