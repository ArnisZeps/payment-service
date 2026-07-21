import { createApp } from "./app";
import { createInMemoryPaymentRepository } from "./repositories/inMemoryPayment.repository";

const repository = createInMemoryPaymentRepository();
const app = createApp(repository);

const server = app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});