const puppeteer = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const hostedAppLive = require('../../index');

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

describe('Bus E2E Tests', () => {
  jest.setTimeout(30000);

  it('should create a bus', async () => {
    const busData = { busNumber: 'BUS123', route: 'Route1' };

    const response = await puppeteer(hostedAppLive).post('/api/buses').send(busData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.busNumber).toBe('BUS123');
    expect(new Date(response.body.lastUpdate)).not.toBeNaN();
    expect(response.body.status).toBeUndefined();
  });

  it('should get all buses', async () => {
    const busData1 = { busNumber: 'BUS001' };
    const busData2 = { busNumber: 'BUS002' };
  
    await puppeteer(hostedAppLive).post('/api/buses').send(busData1);
    await puppeteer(hostedAppLive).post('/api/buses').send(busData2);
  
    const response = await puppeteer(hostedAppLive).get('/api/buses').expect(200);
  
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
    expect(response.body.some(bus => bus.busNumber === 'BUS001')).toBe(true);
    expect(response.body.some(bus => bus.busNumber === 'BUS002')).toBe(true);
  });

  it('should get a bus by ID', async () => {
    const busData = { busNumber: 'BUS999' };
    const addResponse = await puppeteer(hostedAppLive).post('/api/buses').send(busData).expect(201);
    const busId = addResponse.body._id;
  
    const getResponse = await puppeteer(hostedAppLive).get(`/api/buses/${busId}`).expect(200);
  
    expect(getResponse.body).toHaveProperty('_id', busId);
    expect(getResponse.body).toHaveProperty('busNumber', 'BUS999');
  });
  
  it('should return 404 for a non-existent bus', async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const response = await puppeteer(hostedAppLive).get(`/api/buses/${invalidId}`).expect(404);
  
    expect(response.body.message).toBe('Bus not found');
  });

  it('should update a bus', async () => {
    const busData = { busNumber: 'BUS111', status: 'Operational' };
    const addResponse = await puppeteer(hostedAppLive).post('/api/buses').send(busData).expect(201);
    const busId = addResponse.body._id;
  
    const updated = { status: 'Under Maintenance' };
    const updateResponse = await puppeteer(hostedAppLive).put(`/api/buses/${busId}`).send(updated).expect(200);
  
    expect(updateResponse.body).toHaveProperty('status', 'Under Maintenance');
  });
  
  it('should return 404 when updating a non-existent bus', async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const updated = { status: 'Out of Service' };
  
    await puppeteer(hostedAppLive).put(`/api/buses/${invalidId}`).send(updated).expect(404);
  });

  it('should delete a bus', async () => {
    const busData = { busNumber: 'BUSDELETE' };
    const addResponse = await puppeteer(hostedAppLive).post('/api/buses').send(busData).expect(201);
    const busId = addResponse.body._id;
  
    await puppeteer(hostedAppLive).delete(`/api/buses/${busId}`).expect(200);
    await puppeteer(hostedAppLive).get(`/api/buses/${busId}`).expect(404);
  });

  it('should return 400 for invalid bus creation', async () => {
    const invalidData = {};
  
    await puppeteer(hostedAppLive).post('/api/buses').send(invalidData).expect(500);
  });
});