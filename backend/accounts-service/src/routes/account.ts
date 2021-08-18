import { Router } from "express";
import accountController from '../controllers/account';
import { validateAccount, validateLogin } from "./middlewares";

const router = Router();

router.get('/accounts', accountController.getAccounts);

router.get('/account/:id', accountController.getAccount);

router.patch('/account/:id', accountController.setAccount);

router.post('/account', validateAccount, accountController.addAccount);

router.post('/account/login', validateLogin, accountController.loginAccount);

router.post('/account/logout', accountController.logoutAccount);

export default router;