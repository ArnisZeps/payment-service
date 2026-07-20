import { createApp } from "./app";
import { createInMemoryPaymentRepository } from "./repositories/inMemoryPayment.repository";

const repository = createInMemoryPaymentRepository();
const app = createApp(repository);

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});