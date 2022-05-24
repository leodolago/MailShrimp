import { Router } from 'express';
import  accountsController  from '../controllers/accounts';
import {validateAccountSchema, validateloginSchema, validateUpdateAccountSchema, validateAuthentication, validateAuthorization} from './middlewares';

const router = Router();

router.get('/accounts/', validateAuthentication, accountsController.getAccounts);

router.get('/accounts/:id', validateAuthentication, validateAuthorization, accountsController.getAccount);

router.patch('/accounts/:id', validateAuthentication, validateAuthorization, validateUpdateAccountSchema, accountsController.setAccount);

router.post('/accounts/', validateAccountSchema, accountsController.addAccount);

router.post('/accounts/login', validateloginSchema, accountsController.loginAccount);

router.post('/accounts/logout', validateAuthentication, accountsController.logoutAccount);

router.delete('/accounts/:id', validateAuthentication, validateAuthorization, accountsController.deleteAccount);

export default router;