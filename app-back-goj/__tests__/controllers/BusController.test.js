const BusController = require('../../../app-back-goj/controllers/BusController');
const busService = require('../../../app-back-goj/services/BusService');

jest.mock('../../../app-back-goj/services/BusService');

describe('BusController', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {},
      body: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      headersSent: false,
    };
  });

  describe('createBus', () => {
    it('should create a new bus and return 201 with the bus object', async () => {
      const mockBus = { _id: '1', busNumber: 'TestBus' };
      busService.addNewBus.mockResolvedValue(mockBus);

      mockReq.body = { busNumber: 'TestBus' };
      await BusController.createBus(mockReq, mockRes);

      expect(busService.addNewBus).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockBus);
    });

    it('should return 500 if there is an error', async () => {
      const error = new Error('Test error');
      busService.addNewBus.mockRejectedValue(error);

      await BusController.createBus(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Test error' });
    });
  });

  describe('getAllBuses', () => {
    it('should return 200 and list of buses', async () => {
      const mockBuses = [{ _id: '1' }, { _id: '2' }];
      busService.getAllBuses.mockResolvedValue(mockBuses);

      await BusController.getAllBuses(mockReq, mockRes);

      expect(busService.getAllBuses).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockBuses);
    });

    it('should return 500 on error', async () => {
      const error = new Error('GetAll error');
      busService.getAllBuses.mockRejectedValue(error);

      await BusController.getAllBuses(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'GetAll error' });
    });
  });

  describe('getBusById', () => {
    it('should return 200 and the bus object if found', async () => {
      const mockBus = { _id: '1', busNumber: 'TestBus' };
      busService.getBusById.mockResolvedValue(mockBus);

      mockReq.params.id = '1';
      await BusController.getBusById(mockReq, mockRes);

      expect(busService.getBusById).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockBus);
    });

    it('should return 404 if bus not found', async () => {
      busService.getBusById.mockResolvedValue(null);

      mockReq.params.id = 'unknown';
      await BusController.getBusById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Bus not found' });
    });

    it('should return 500 on error', async () => {
      busService.getBusById.mockRejectedValue(new Error('Test error'));

      await BusController.getBusById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Test error' });
    });
  });

  describe('updateBus', () => {
    it('should return 200 with updated bus if successful', async () => {
      const updatedBus = { _id: '1', busNumber: 'UpdatedBus' };
      busService.modifyBus.mockResolvedValue(updatedBus);

      mockReq.params.id = '1';
      mockReq.body = { busNumber: 'UpdatedBus' };

      await BusController.updateBus(mockReq, mockRes);

      expect(busService.modifyBus).toHaveBeenCalledWith('1', { busNumber: 'UpdatedBus' });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(updatedBus);
    });

    it('should return 404 if bus not found', async () => {
      busService.modifyBus.mockResolvedValue(null);

      mockReq.params.id = '404';
      await BusController.updateBus(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Bus not found' });
    });

    it('should return 500 on error', async () => {
      busService.modifyBus.mockRejectedValue(new Error('Update error'));

      await BusController.updateBus(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Update error' });
    });
  });

  describe('deleteBus', () => {
    it('should return 200 and deleted bus if successful', async () => {
      const mockDeleted = { _id: '1', busNumber: 'Removed' };
      busService.removeBus.mockResolvedValue(mockDeleted);

      mockReq.params.id = '1';
      await BusController.deleteBus(mockReq, mockRes);

      expect(busService.removeBus).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockDeleted);
    });

    it('should return 404 if bus not found', async () => {
      busService.removeBus.mockResolvedValue(null);

      mockReq.params.id = '404';
      await BusController.deleteBus(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Bus not found' });
    });

    it('should return 500 on error', async () => {
      busService.removeBus.mockRejectedValue(new Error('Delete error'));

      await BusController.deleteBus(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Delete error' });
    });
  });
});