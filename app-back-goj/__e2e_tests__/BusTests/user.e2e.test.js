const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../index');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User E2E Tests', () => {
    jest.setTimeout(30000);

    it('should create a user', async () => {
        const userData = { userName: 'John', userSurname: "Doe", email: 'john@example.com', password: 'securePass123' };
        const response = await request(app).post('/api/users').send(userData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.userName).toBe('John');
    });
    
    it('should get all users', async () => {
        const userData1 = { userName: 'John', userSurname: "Doe", email: 'jane@example.com', password: 'securePass456' };
        const userData2 = { userName: 'Alice', userSurname: "Doe", email: 'alice@example.com', password: 'securePass789' };
        await request(app).post('/api/users').send(userData1);
        await request(app).post('/api/users').send(userData2);
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
    
    it('should get a user by ID', async () => {
        const data = { userName: 'John', userSurname: "Doe", email: 'bob@example.com', password: 'securePass000' };
        const addRes = await request(app).post('/api/users').send(data).expect(201);
        const userId = addRes.body._id;
        const getRes = await request(app).get(`/api/users/${userId}`).expect(200);
        expect(getRes.body).toHaveProperty('_id', userId);
    });
    
    it('should return 404 for non-existent user', async () => {
        const invalidId = new mongoose.Types.ObjectId();
        const response = await request(app).get(`/api/users/${invalidId}`).expect(404);
        expect(response.body.message).toBeDefined();
    });
    
    it('should update a user', async () => {
        const addRes = await request(app).post('/api/users').send({ userName: 'John', userSurname: "Doe", role: 'Admin', password: 'securePass111' }).expect(201);
        const userId = addRes.body._id;
        const updated = { username: 'charlie_updated', email: 'charlie_new@example.com' };
        const updateRes = await request(app).put(`/api/users/${userId}`).send(updated).expect(200);
        expect(updateRes.body).toHaveProperty('userName', 'John');
        expect(updateRes.body).toHaveProperty('role', 'Admin');
    });
    
    it('should return 404 when updating a non-existent user', async () => {
        const invalidId = new mongoose.Types.ObjectId();
        await request(app).put(`/api/users/${invalidId}`).send({ username: 'no_user' }).expect(404);
    });
    
    it('should delete a user', async () => {
        const addRes = await request(app).post('/api/users').send({userName: 'John', userSurname: "Doe", email: 'david@example.com', password: 'securePass222' }).expect(201);
        const userId = addRes.body._id;
        await request(app).delete(`/api/users/${userId}`).expect(200);
        await request(app).get(`/api/users/${userId}`).expect(404);
    });
    
    it('should return 400 or 500 for invalid creation', async () => {
        await request(app).post('/api/users').send({}).expect(500);
    });
});