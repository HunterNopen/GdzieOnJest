const LocationController = require('../../../app-back-goj/controllers/LocationController');
const locationService = require('../../../app-back-goj/services/LocationService');

jest.mock('../../../app-back-goj/services/LocationService');

describe('LocationController', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      headersSent: false,
    };
  });

  describe('createLocation', () => {
    it('should create a new location and return 201 with the location object', async () => {
      const mockLocation = { _id: '1', name: 'TestLocation' };
      locationService.addNewLocation.mockResolvedValue(mockLocation);

      mockReq.body = { name: 'TestLocation' };
      await LocationController.createLocation(mockReq, mockRes);

      expect(locationService.addNewLocation).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockLocation);
    });

    it('should return 500 if there is an error', async () => {
      locationService.addNewLocation.mockRejectedValue(new Error('Test error'));

      await LocationController.createLocation(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Test error' });
    });
  });

  describe('getAllLocations', () => {
    it('should return 200 and list of locations', async () => {
      const mockLocations = [{ _id: '1' }, { _id: '2' }];
      locationService.getAllLocations.mockResolvedValue(mockLocations);

      await LocationController.getAllLocations(mockReq, mockRes);

      expect(locationService.getAllLocations).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockLocations);
    });

    it('should return 500 on error', async () => {
      locationService.getAllLocations.mockRejectedValue(new Error('GetAll error'));

      await LocationController.getAllLocations(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'GetAll error' });
    });
  });

  describe('getLocationById', () => {
    it('should return 200 and the location object if found', async () => {
      const mockLocation = { _id: '1', name: 'LocationOne' };
      locationService.getLocationById.mockResolvedValue(mockLocation);

      mockReq.params.id = '1';
      await LocationController.getLocationById(mockReq, mockRes);

      expect(locationService.getLocationById).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockLocation);
    });

    it('should return 404 if location not found', async () => {
      locationService.getLocationById.mockResolvedValue(null);

      mockReq.params.id = 'unknown';
      await LocationController.getLocationById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Location not found' });
    });

    it('should return 500 on error', async () => {
      locationService.getLocationById.mockRejectedValue(new Error('Test error'));

      await LocationController.getLocationById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Test error' });
    });
  });

  describe('updateLocation', () => {
    it('should return 200 with updated location if successful', async () => {
      const updatedLocation = { _id: '1', name: 'UpdatedLocation' };
      locationService.modifyLocation.mockResolvedValue(updatedLocation);

      mockReq.params.id = '1';
      mockReq.body = { name: 'UpdatedLocation' };
      await LocationController.updateLocation(mockReq, mockRes);

      expect(locationService.modifyLocation).toHaveBeenCalledWith('1', { name: 'UpdatedLocation' });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(updatedLocation);
    });

    it('should return 404 if location not found', async () => {
      locationService.modifyLocation.mockResolvedValue(null);

      mockReq.params.id = '404';
      await LocationController.updateLocation(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Location not found' });
    });

    it('should return 500 on error', async () => {
      locationService.modifyLocation.mockRejectedValue(new Error('Update error'));

      await LocationController.updateLocation(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Update error' });
    });
  });

  describe('deleteLocation', () => {
    it('should return 200 and deleted location if successful', async () => {
      const mockDeleted = { _id: '1', name: 'RemovedLocation' };
      locationService.removeLocation.mockResolvedValue(mockDeleted);

      mockReq.params.id = '1';
      await LocationController.deleteLocation(mockReq, mockRes);

      expect(locationService.removeLocation).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockDeleted);
    });

    it('should return 404 if location not found', async () => {
      locationService.removeLocation.mockResolvedValue(null);

      mockReq.params.id = '404';
      await LocationController.deleteLocation(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Location not found' });
    });

    it('should return 500 on error', async () => {
      locationService.removeLocation.mockRejectedValue(new Error('Delete error'));

      await LocationController.deleteLocation(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Delete error' });
    });
  });
});