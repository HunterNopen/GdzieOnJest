const request = require('supertest');
const app = require('../index');

describe('HelloWorld Component E2E Test', () => {
    it('should return a greeting message', async () => {
        const response = await request(app).get('/');
        expect(response.text).toBe('GdzieOnJest Welcomes Urbanowicz!');
    });
});