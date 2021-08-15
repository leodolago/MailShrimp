import { Router, Request, Response } from "express";
import accountController from '../controllers/account';

const router = Router();

router.get('/accounts', accountController.getAccounts);

router.get('/account/:id', accountController.getAccount);

router.post('/account', accountController.addAccount);

export default router;