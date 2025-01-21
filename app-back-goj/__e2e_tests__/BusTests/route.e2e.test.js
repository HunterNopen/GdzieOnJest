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

describe('Route E2E Tests', () => {
  jest.setTimeout(30000);

  it('should create a route', async () => {
    const routeData = { routeName: 'Route10' };
    const response = await request(app).post('/api/routes').send(routeData);
    expect(response.status).toBe(201);
    expect(response.body.routeName).toBe('Route10');
  });

  it('should get all routes', async () => {
    const response = await request(app).get('/api/routes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update a route', async () => {
    const created = await request(app).post('/api/routes').send({ routeName: 'TempRoute' });
    const response = await request(app)
      .put(`/api/routes/${created.body._id}`)
      .send({ routeName: 'UpdatedRoute' });
    expect(response.status).toBe(200);
    expect(response.body.routeName).toBe('UpdatedRoute');
  });

  it('should delete a route', async () => {
    const created = await request(app).post('/api/routes').send({ routeName: 'ToDelete' });
    const response = await request(app).delete(`/api/routes/${created.body._id}`);
    expect(response.status).toBe(200);
  });
}
);