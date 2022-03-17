import { Router } from 'express';
import  accountsController  from '../controllers/accounts';
import {validateAccount, validatelogin, validateUpdateAccount} from './middlewares'

const router = Router();

router.get('/accounts/', accountsController.getAccounts);

router.get('/accounts/:id', accountsController.getAccount);

router.patch('/accounts/:id', validateUpdateAccount, accountsController.setAccount);

router.post('/accounts/', validateAccount, accountsController.addAccount);

router.post('/accounts/login', validatelogin, accountsController.loginAccount);

router.post('/accounts/logout', accountsController.logoutAccount);

export default router;