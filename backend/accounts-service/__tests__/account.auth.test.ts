import supertest from 'supertest';
import app from '../src/app';

import { describe, it, expect } from '@jest/globals';

describe('Testando rotas de autenticação', () => {
    it('POST /account/login - 200 OK', async () => {
        //mocking
        const newAccount= {
            id: 1,
            name: 'Daniel',
            email: 'danielcastro.rs@gmail.com',
            password: '1234567',
        }

        await supertest(app)
        .post('/account/')
        .send(newAccount);

        //testing
        const payload = {
            email: 'danielcastro.rs@gmail.com',
            password: '1234567',
        }

        const result = await supertest(app)
        .post('/account/login')
        .send(payload);

        expect(result.status).toEqual(200);
        expect(result.body.auth).toBeTruthy();
        expect(result.body.token).toBeTruthy();
    })

    it('POST /account/login - 422 Unprocessable Entity', async () => {
        const payload = {
            email: 'danielcastro.rs@gmail.com',
            password: 'abc1',
        }

        const result = await supertest(app)
        .post('/account/login')
        .send(payload);

        expect(result.status).toEqual(422);
    })

    it('POST /account/login - 401 Unauthorized', async () => {
        const payload = {
            email: 'danielcastro.rs@gmail.com',
            password: 'abc123',
        }

        const result = await supertest(app)
        .post('/account/login')
        .send(payload);

        expect(result.status).toEqual(401);
    })

    it('POST /account/logout - 200 OK', async () => {
        
        const result = await supertest(app)
        .post('/account/logout');

        expect(result.status).toEqual(200);
    })

})