const request = require('supertest');
const app = require('../index');

describe('GET /', () => {
    it('should return welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('GdzieOnJest Welcomes Urbanowicz!');
    });
});

describe('GET /api-docs', () => {
    it('should return swagger documentation', async () => {
        const res = await request(app).get('/api-docs');
        expect(res.statusCode).toEqual(301);
    });
});

describe('Error handling', () => {
    it('should return 500 for internal server error', async () => {
        app.get('/error', (req, res) => {
            throw new Error('Test error');
        });

        const res = await request(app).get('/error');
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({});
    });
});