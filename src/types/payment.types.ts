export type Currency = "USD" | "EUR" | "GBP";

export interface Payment {
    paymentId: string;
    amount: number;
    currency: Currency;
    debtorIband: string;
    creditorIband: string;
    reference: string | null;
}

export interface ValidationError {
    field: string;
    message: string;
}
