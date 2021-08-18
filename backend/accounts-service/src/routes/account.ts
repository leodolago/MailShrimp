import { Router, Request, Response } from "express";
import Joi from "joi";
import accountController from '../controllers/account';
import { accountSchema, loginSchema } from "../models/account";

function validateSchema( schema: Joi.ObjectSchema<any> , req: Request, res: Response, next: any) {
    const {error} = schema.validate(req.body);
    if(error == null) return next();

    const {details} = error;
    const message = details.map(item => item.message).join(',');

    console.log(message);
    res.status(422).end();
}

function validateAccount(req: Request, res: Response, next: any) {
    return validateSchema(accountSchema, req, res, next);
}

function validateLogin(req: Request, res: Response, next: any) {
    return validateSchema(loginSchema, req, res, next);
}

const router = Router();

router.get('/accounts', accountController.getAccounts);

router.get('/account/:id', accountController.getAccount);

router.patch('/account/:id', accountController.setAccount);

router.post('/account', validateAccount, accountController.addAccount);

router.post('/account/login', validateLogin, accountController.loginAccount);

router.post('/account/logout', accountController.logoutAccount);

export default router;