# payment-service

A small Express + TypeScript service for submitting and listing payments, with
idempotent duplicate/conflict detection based on payment ID.

## Running it

```bash
npm install
npm start
```

Starts the server on `http://localhost:3000`.

- `POST /payments` — submit a payment (`paymentId`, `amount`, `currency`, `debtorIban`, `creditorIban`, optional `reference`)
- `GET /payments` — list all stored payments

## Tests

```bash
npm test
```

Unit tests ([test/payments.service.test.ts](test/payments.service.test.ts)) cover `PaymentService.submit`: accepting valid input, treating an identical resubmit as a duplicate, reporting a conflict when the same `paymentId` arrives with different content, and rejecting invalid input.

## Notes

**Key decisions**

- Used `paymentId` to detect duplicates: if a client retries the same payment, resending the exact same data returns the original payment instead of creating a second one. If the same id shows up with different data, that's treated as a conflict instead, since it's not really a retry.
- Application sticks to controller-service-repository pattern with factory functions. 

**Shortcuts taken**

- No auth/authorization on the endpoints.
- No pagination or filtering on `GET /payments`, it returns everything in one go

**What I'd improve with more time**

- Swap the in-memory repository for a real datastore such as Postgres.
- Wrap the application in the container
- Add Authorization on the endpoints
- Expand unit test functionality to cover controller and repository
- Pagination for `GET /payments` to handle bigger datasets 
