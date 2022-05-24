import { Request, Response } from 'express';
import commonsMidleware from 'ms-commons/api/routes/middlewares'
import { accountSchema, loginSchema, accountUpdateSchema } from '../models/accountSchemas';
import controllerCommons from 'ms-commons/api/controllers/controller';
import {Token} from 'ms-commons/api/auth';

function validateAccountSchema(req: Request, res: Response, next: any) {
    return commonsMidleware.validateSchema(accountSchema, req, res, next);
}

function validateUpdateAccountSchema(req: Request, res: Response, next: any) {
    return commonsMidleware.validateSchema(accountUpdateSchema, req, res, next);
}

function validateloginSchema(req: Request, res: Response, next: any) {
    return commonsMidleware.validateSchema(loginSchema, req, res, next);
}

async function validateAuthentication(req: Request, res: Response, next: any) {
    return commonsMidleware.validateAuth(req, res, next);
}

function validateAuthorization(req: Request, res: Response, next: any){
    const accountId = parseInt(req.params.id);
    if (!accountId) return res.status(400).end();
    
    const token = controllerCommons.getToken(res) as Token;

    if(accountId !== token.accountId) return res.status(403).end();
    
    next();
}

export { validateAccountSchema, validateloginSchema, validateUpdateAccountSchema, validateAuthentication, validateAuthorization}