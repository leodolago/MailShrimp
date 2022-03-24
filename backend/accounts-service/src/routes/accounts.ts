import { Router } from 'express';
import  accountsController  from '../controllers/accounts';
import {validateAccountSchema, validateloginSchema, validateUpdateAccountSchema, validateAuth} from './middlewares';
import calc from 'ms-commons/calc';

const router = Router();

router.get('/accounts/', validateAuth, accountsController.getAccounts);

router.get('/accounts/:id', validateAuth, accountsController.getAccount);

router.patch('/accounts/:id', validateAuth, validateUpdateAccountSchema, accountsController.setAccount);

router.post('/accounts/', validateAccountSchema, accountsController.addAccount);

router.post('/accounts/login', validateloginSchema, accountsController.loginAccount);

router.post('/accounts/logout', accountsController.logoutAccount);

router.get('/somar/:val1/:val2', (req, res, next) =>{
    const val1 = parseInt(`${req.params.val1}`);
    const val2 = parseInt(`${req.params.val2}`);
    const resultado = calc(val1, val2);
    res.json({resultado});
})

export default router;