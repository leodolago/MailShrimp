import Joi from "joi";
import { accountSchema, loginSchema } from "../models/account";
import { Request, Response } from "express";

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

export { validateAccount, validateLogin }