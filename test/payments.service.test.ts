import { describe, expect, it } from 'vitest';
import { createInMemoryPaymentRepository } from '../src/repositories/inMemoryPayment.repository';
import { createPaymentService } from '../src/services/payment.service';

const validPayment = {
  paymentId: '11111111-1111-1111-1111-111111111111',
  amount: 100.5,
  currency: 'EUR',
  debtorIban: 'LV97HABA0012345678910',
  creditorIban: 'LV12PARX0000000000001',
  reference: 'Invoice 42',
};

function makeService() {
  return createPaymentService(createInMemoryPaymentRepository());
}

describe('PaymentService.submit', () => {
  it('accepts valid input as created', () => {
    const service = makeService();
    const result = service.submit(validPayment);
    expect(result.kind).toBe('created');
  });

  it('treats an identical resubmit as a duplicate and stores it once', () => {
    const service = makeService();
    service.submit(validPayment);
    const result = service.submit(validPayment);

    expect(result.kind).toBe('duplicate');
    expect(service.list()).toHaveLength(1);
  });

  it('reports a conflict when the same id arrives with a different amount', () => {
    const service = makeService();
    service.submit(validPayment);
    const result = service.submit({ ...validPayment, amount: 200 });

    expect(result.kind).toBe('conflict');
  });

  it('rejects invalid input and stores nothing', () => {
    const service = makeService();
    const result = service.submit({ paymentId: '', amount: -1 });

    expect(result.kind).toBe('invalid');
    expect(service.list()).toHaveLength(0);
  });
});
