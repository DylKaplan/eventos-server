import { expect } from 'chai';
import supertest from 'supertest';
import generador from './generador/test.js';

const request = supertest('http://127.0.0.1:8080');

describe('API Endpoints Test', () => {
    describe('GET /api/eventos/obtener', () => {
        it('Debería retornar una lista de eventos', async () => {
            const response = await request.get('/api/eventos/obtener');

            expect(response.status).to.eql(200);
            expect(response.body).to.be.an('array');
        });
    });

    describe('POST /api/usuario/registrar', () => {
        it('Debería crear un nuevo usuario', async () => {
            const nuevoUsuario = generador.generarUsuario();

            const response = await request.post('/api/usuario/registrar').send(nuevoUsuario);

            expect(response.status).to.eql(200);
            expect(response.body).to.include.keys('user');
            expect(response.body.user).to.eql(nuevoUsuario.user.toUpperCase());
        });
    });
});
