import { Request, Response } from 'express';
import commonsMidleware from 'ms-commons/api/routes/middlewares'
import { contactSchema, contactUpdateSchema } from '../models/contactSchemas';

function validateContactSchema(req: Request, res: Response, next: any) {
    return commonsMidleware.validateSchema(contactSchema, req, res, next);
}

function validateUpdateContactSchema(req: Request, res: Response, next: any) {
    return commonsMidleware.validateSchema(contactUpdateSchema, req, res, next);
}

export { validateContactSchema, validateUpdateContactSchema }