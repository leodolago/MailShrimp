import { Router } from 'express';
import middlewareCommons from 'ms-commons/api/routes/middlewares'
import {validateContactSchema, validateUpdateContactSchema} from './middlewares';
import controller from '../controllers/contacts';

const router = Router();

router.get('/contacts/:id', middlewareCommons.validateAuth, controller.getContact);

router.get('/contacts/', middlewareCommons.validateAuth, controller.getContacts);

router.post('/contacts/', middlewareCommons.validateAuth, validateContactSchema, controller.addContact);

router.patch('/contacts/:id', middlewareCommons.validateAuth, validateUpdateContactSchema, controller.setContact);

export default router