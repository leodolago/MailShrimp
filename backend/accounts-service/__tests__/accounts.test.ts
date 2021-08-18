import supertest from 'supertest';
import app from '../src/app';

import { describe, it, expect } from '@jest/globals';

describe('Testando rotas do accounts', () => {
    it('GET /accounts/ - Deve retornar statusCode 200', async () => {
        const result = await supertest(app)
        .get('/accounts/');

        expect(result.status).toEqual(200);
        expect(Array.isArray(result.body)).toBeTruthy();
    })

    it('POST /accounts/ - Deve retornar statusCode 201', async () => {
        const payload = {
            id: 1,
            name: 'Daniel',
            email: 'danielcastro.rs@gmail.com',
            password: '123456',
        }

        const result = await supertest(app)
        .post('/account/')
        .send(payload);

        expect(result.status).toEqual(201);
        expect(result.body.id).toBe(1);
    });  

    it('POST /accounts/ - Deve retornar statusCode 422', async () => {
        const payload = {
            id: 1,
            street: 'Rua dos tupis',
            city: 'Gravatai',
            state: 'RS'
        }

        const result = await supertest(app)
        .post('/account/')
        .send(payload);

        expect(result.status).toEqual(422);
    }); 

    it('PATCH /account/:id - Deve retornar statusCode 200', async () => {
        const payload = {
            name: 'Daniel Castro',
            email: 'danielcastro.rs@gmail.com',
            password: '123456789',
        }

        const result = await supertest(app)
        .patch('/account/1')
        .send(payload);

        expect(result.status).toEqual(200);
        expect(result.body.id).toEqual(1);
    });  

    it('PATCH /account/:id - Deve retornar statusCode 400', async () => {
        const payload = {
            name: 'Daniel Castro',
            email: 'danielcastro.rs@gmail.com',
            password: '123456789'
        }

        const result = await supertest(app)
        .patch('/account/abc')
        .send(payload);

        expect(result.status).toEqual(400);
    });  

    it('PATCH /account/:id - Deve retornar statusCode 404', async () => {
        const payload = {
            name: 'Daniel Castro',
            email: 'danielcastro.rs@gmail.com',
            password: '123456789'
        }

        const result = await supertest(app)
        .patch('/account/-1')
        .send(payload);

        expect(result.status).toEqual(404);
    });

    it('GET /account/:id - Deve retornar statusCode 200', async () => {
        const result = await supertest(app)
        .get('/account/1');

        expect(result.status).toEqual(200);
        expect(result.body.id).toBe(1);
    })

    it('GET /account/:id - Deve retornar statusCode 404', async () => {
        const result = await supertest(app)
        .get('/account/2');

        expect(result.status).toEqual(404);
    })

    it('GET /account/:id - Deve retornar statusCode 400', async () => {
        const result = await supertest(app)
        .get('/account/abc');

        expect(result.status).toEqual(400);
    })
})