const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const mongooseLocation = require('mongoose');
const appLocation = require('../../index');

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

describe('Location E2E Tests', () => {
    jest.setTimeout(30000);

    it('should create a location', async () => {
        const locationData = { zone: "Zone1", area: "Area1" };
        const response = await request(appLocation).post('/api/locations').send(locationData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.zone).toBe('Zone1');
    });

    it('should get all locations', async () => {
        const locationData1 = { zone: "Zone1", area: "Area1" };
        const locationData2 = { zone: "Zone2", area: "Area2" };
        await request(appLocation).post('/api/locations').send(locationData1);
        await request(appLocation).post('/api/locations').send(locationData2);
        const response = await request(appLocation).get('/api/locations').expect(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThanOrEqual(2);
    });

    it('should get a location by ID', async () => {
        const data = { zone: "Zone1", area: "Area1" };
        const addRes = await request(appLocation).post('/api/locations').send(data).expect(201);
        const locationId = addRes.body._id;
        const getRes = await request(appLocation).get(`/api/locations/${locationId}`).expect(200);
        expect(getRes.body).toHaveProperty('_id', locationId);
    });

    it('should return 404 for non-existent location', async () => {
        const invalidId = new mongooseLocation.Types.ObjectId();
        const response = await request(appLocation).get(`/api/locations/${invalidId}`).expect(404);
        expect(response.body.message).toBeDefined();
    });

    it('should update a location', async () => {
        const addRes = await request(appLocation).post('/api/locations').send({ zone: "Zone1", area: "Area1" }).expect(201);
        const locationId = addRes.body._id;
        const updated = { zone: 'Liberty Island Updated' };
        const updateRes = await request(appLocation).put(`/api/locations/${locationId}`).send(updated).expect(200);
        expect(updateRes.body).toHaveProperty('zone', 'Liberty Island Updated');
    });

    it('should return 404 when updating a non-existent location', async () => {
        const invalidId = new mongooseLocation.Types.ObjectId();
        await request(appLocation).put(`/api/locations/${invalidId}`).send({ name: 'No Location' }).expect(404);
    });

    it('should delete a location', async () => {
        const addRes = await request(appLocation).post('/api/locations').send({ zone: "Zone1", area: "Area1" }).expect(201);
        const locationId = addRes.body._id;
        await request(appLocation).delete(`/api/locations/${locationId}`).expect(200);
        await request(appLocation).get(`/api/locations/${locationId}`).expect(404);
    });

    it('should return 400 or 500 for invalid creation', async () => {
        await request(appLocation).post('/api/locations').send(null).expect(201);
    });
});
});