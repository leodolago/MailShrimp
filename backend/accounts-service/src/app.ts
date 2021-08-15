import express from 'express';
import helmet from 'helmet';
import accountsRouter from './routes/account';

const app = express();
app.use(helmet());
app.use(express.json());

app.use(accountsRouter);

app.listen(process.env.PORT);
console.log(`server is running at ${process.env.PORT}`);