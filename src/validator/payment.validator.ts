import type {
  Currency,
  Payment,
  ValidationError,
  ValidationResult,
} from '../types/payment.types';

const CURRENCIES: readonly Currency[] = ['EUR', 'USD', 'GBP'];

// Two letters followed by alphanumerics, 15-34 characters total
const IBAN_FORMAT = /^[A-Z]{2}[A-Z0-9]{13,32}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
export function validatePayment(input: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (!isRecord(input)) {
    return {
      ok: false,
      errors: [{ field: 'body', message: 'body must be a JSON object' }],
    };
  }

  const { paymentId, amount, currency, debtorIban, creditorIban, reference } =
    input;

  if (typeof paymentId !== 'string' || paymentId.trim() === '') {
    errors.push({
      field: 'paymentId',
      message: 'required, must be a non-empty string',
    });
  }

  if (
    typeof amount !== 'number' ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    Number(amount.toFixed(2)) !== amount
  ) {
    errors.push({
      field: 'amount',
      message:
        'required, must be a finite number greater than 0 with at most 2 decimal places',
    });
  }

  if (
    typeof currency !== 'string' ||
    !CURRENCIES.includes(currency as Currency)
  ) {
    errors.push({
      field: 'currency',
      message: `required, must be one of ${CURRENCIES.join(', ')}`,
    });
  }

  if (typeof debtorIban !== 'string' || !IBAN_FORMAT.test(debtorIban)) {
    errors.push({
      field: 'debtorIban',
      message: 'required, must be a valid IBAN format',
    });
  }

  if (typeof creditorIban !== 'string' || !IBAN_FORMAT.test(creditorIban)) {
    errors.push({
      field: 'creditorIban',
      message: 'required, must be a valid IBAN format',
    });
  }

  const hasReference = reference !== undefined && reference !== null;
  if (reference !== undefined && reference !== null && typeof reference !== 'string') {
    errors.push({
      field: 'reference',
      message: 'optional, must be a string or null when present',
    });
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const payment: Payment = {
    paymentId: paymentId as string,
    amount: amount as number,
    currency: currency as Currency,
    debtorIban: debtorIban as string,
    creditorIban: creditorIban as string,
  };

  if (hasReference) {
    payment.reference = reference as string;
  }

  return { ok: true, payment };
}
