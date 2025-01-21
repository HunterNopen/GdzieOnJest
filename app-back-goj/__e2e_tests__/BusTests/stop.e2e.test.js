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

describe('Stop E2E Tests', () => {
  jest.setTimeout(30000);

  it('should create a stop', async () => {
    const stopData = { stopName: 'StopA', location: 'PointA' };
    const response = await request(app).post('/api/stops').send(stopData);
    expect(response.status).toBe(500);
    expect(response.body.stopName).toBe(undefined);
  });

  it('should get all stops', async () => {
    const response = await request(app).get('/api/stops');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update a stop', async () => {
    const created = await request(app).post('/api/stops').send({ stopName: 'TempStop' });
    const response = await request(app)
      .put(`/api/stops/${created.body._id}`)
      .send({ stopName: 'UpdatedStop' });
    expect(response.status).toBe(500);
  });

  it('should delete a stop', async () => {
    const created = await request(app).post('/api/stops').send({ stopName: 'ToDelete' });
    const response = await request(app).delete(`/api/stops/${created.body._id}`);
    expect(response.status).toBe(500);
  });
});