/* eslint-disable global-require */
/* eslint-disable no-undef */
const supertest = require('supertest');

const HOST_URL = 'http://localhost:5000/api/v1';
const request = supertest(HOST_URL);

describe('api/v1/', () => {
    describe('routing', () => {
        it('should return 404 if an unknown route is visited', async () => {
            const res = await request.get('/api/v1/unknown');

            expect(res.status).toBe(404);
        });
    });
});
