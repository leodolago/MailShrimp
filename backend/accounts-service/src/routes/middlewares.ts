import { Request, Response } from 'express';
import Joi from 'joi';
import auth from '../auth';
import { accountSchema, loginSchema, accountUpdateSchema } from '../models/accountSchemas';


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

function validateUpdateAccount(req: Request, res: Response, next: any) {
    return validateSchema(accountUpdateSchema, req, res, next);
}

function validatelogin(req: Request, res: Response, next: any) {
    return validateSchema(loginSchema, req, res, next);
}

async function validateAuth(req: Request, res: Response, next: any) {
    try {
        const token = req.headers['x-access-token'] as string;
        if(!token)return res.status(401).end();

        const payload = await auth.verify(token);
        if(!payload) return res.status(401).end();

        res.locals.payload = payload;

        next();

    } catch(error){
        console.log(`validateAuth: ${error}`);
        res.status(400).end();
    }
}

export { validateAccount, validatelogin, validateUpdateAccount, validateAuth}