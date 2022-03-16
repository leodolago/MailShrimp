import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import accountsRouter from './routes/accounts';

const app = express();
app.use(helmet());
app.use(bodyParser.json());

app.use(accountsRouter);

export default app;