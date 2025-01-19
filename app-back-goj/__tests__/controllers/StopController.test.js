const StopController = require('../../../app-back-goj/controllers/StopController');
const stopService = require('../../../app-back-goj/services/StopService');

jest.mock('../../../app-back-goj/services/StopService');

describe('StopController', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      headersSent: false,
    };
  });

  describe('createStop', () => {
    it('should create a new stop and return 201 with the stop object', async () => {
      const mockStop = { _id: '1', stopName: 'TestStop' };
      stopService.addNewStop.mockResolvedValue(mockStop);

      mockReq.body = { stopName: 'TestStop' };
      await StopController.createStop(mockReq, mockRes);

      expect(stopService.addNewStop).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockStop);
    });

    it('should return 500 if there is an error', async () => {
      stopService.addNewStop.mockRejectedValue(new Error('Test error'));

      await StopController.createStop(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Test error' });
    });
  });

  describe('getAllStops', () => {
    it('should return 200 and list of stops', async () => {
      const mockStops = [{ _id: '1' }, { _id: '2' }];
      stopService.getAllStops.mockResolvedValue(mockStops);

      await StopController.getAllStops(mockReq, mockRes);

      expect(stopService.getAllStops).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockStops);
    });

    it('should return 500 on error', async () => {
      const error = new Error('GetAll error');
      stopService.getAllStops.mockRejectedValue(error);

      await StopController.getAllStops(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'GetAll error' });
    });
  });

  describe('getStopById', () => {
    it('should return 200 and the stop object if found', async () => {
      const mockStop = { _id: '1', stopName: 'TestStop' };
      stopService.getStopById.mockResolvedValue(mockStop);

      mockReq.params.id = '1';
      await StopController.getStopById(mockReq, mockRes);

      expect(stopService.getStopById).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockStop);
    });

    it('should return 404 if stop not found', async () => {
      stopService.getStopById.mockResolvedValue(null);

      mockReq.params.id = 'unknown';
      await StopController.getStopById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Stop not found' });
    });

    it('should return 500 on error', async () => {
      stopService.getStopById.mockRejectedValue(new Error('Test error'));

      await StopController.getStopById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Test error' });
    });
  });

  describe('updateStop', () => {
    it('should return 200 with updated stop if successful', async () => {
      const updatedStop = { _id: '1', stopName: 'UpdatedStop' };
      stopService.modifyStop.mockResolvedValue(updatedStop);

      mockReq.params.id = '1';
      mockReq.body = { stopName: 'UpdatedStop' };
      await StopController.updateStop(mockReq, mockRes);

      expect(stopService.modifyStop).toHaveBeenCalledWith('1', { stopName: 'UpdatedStop' });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(updatedStop);
    });

    it('should return 404 if stop not found', async () => {
      stopService.modifyStop.mockResolvedValue(null);

      mockReq.params.id = '404';
      await StopController.updateStop(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Stop not found' });
    });

    it('should return 500 on error', async () => {
      stopService.modifyStop.mockRejectedValue(new Error('Update error'));

      await StopController.updateStop(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Update error' });
    });
  });

  describe('deleteStop', () => {
    it('should return 200 and deleted stop if successful', async () => {
      const mockDeleted = { _id: '1', stopName: 'RemovedStop' };
      stopService.removeStop.mockResolvedValue(mockDeleted);

      mockReq.params.id = '1';
      await StopController.deleteStop(mockReq, mockRes);

      expect(stopService.removeStop).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockDeleted);
    });

    it('should return 404 if stop not found', async () => {
      stopService.removeStop.mockResolvedValue(null);

      mockReq.params.id = '404';
      await StopController.deleteStop(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Stop not found' });
    });

    it('should return 500 on error', async () => {
      stopService.removeStop.mockRejectedValue(new Error('Delete error'));

      await StopController.deleteStop(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Delete error' });
    });
  });
});