import { Request, Response } from 'express';
import { accountSchema, loginSchema } from '../models/accountSchema';
import Joi from 'joi';

function validateSchema(schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: any) {
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

function validatelogin(req: Request, res: Response, next: any) {
    return validateSchema(loginSchema, req, res, next);
}

export { validateAccount, validatelogin }