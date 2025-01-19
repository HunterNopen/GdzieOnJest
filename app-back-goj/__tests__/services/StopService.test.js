const StopService = require('../../../app-back-goj/services/StopService');
const stopRepo = require('../../../app-back-goj/repositories/StopRepository');

jest.mock('../../../app-back-goj/repositories/StopRepository');

describe('StopService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addNewStop', () => {
    it('should add a new stop and return the created stop', async () => {
      const stopData = { name: 'Main Street', location: 'Downtown' };
      const createdStop = { _id: '1', ...stopData };
      stopRepo.createStop.mockResolvedValue(createdStop);

      const result = await StopService.addNewStop(stopData);

      expect(stopRepo.createStop).toHaveBeenCalledWith(stopData);
      expect(result).toEqual(createdStop);
    });

    it('should throw an error if creation fails', async () => {
      const stopData = { name: 'Main Street', location: 'Downtown' };
      const error = new Error('Creation failed');
      stopRepo.createStop.mockRejectedValue(error);

      await expect(StopService.addNewStop(stopData)).rejects.toThrow('Creation failed');
      expect(stopRepo.createStop).toHaveBeenCalledWith(stopData);
    });
  });

  describe('getAllStops', () => {
    it('should return a list of all stops', async () => {
      const stops = [
        { _id: '1', name: 'Main Street', location: 'Downtown' },
        { _id: '2', name: 'Broadway', location: 'Uptown' },
      ];
      stopRepo.findAllStops.mockResolvedValue(stops);

      const result = await StopService.getAllStops();

      expect(stopRepo.findAllStops).toHaveBeenCalled();
      expect(result).toEqual(stops);
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      stopRepo.findAllStops.mockRejectedValue(error);

      await expect(StopService.getAllStops()).rejects.toThrow('Retrieval failed');
      expect(stopRepo.findAllStops).toHaveBeenCalled();
    });
  });

  describe('getStopById', () => {
    it('should return the stop if found', async () => {
      const stop = { _id: '1', name: 'Main Street', location: 'Downtown' };
      stopRepo.findStopById.mockResolvedValue(stop);

      const result = await StopService.getStopById('1');

      expect(stopRepo.findStopById).toHaveBeenCalledWith('1');
      expect(result).toEqual(stop);
    });

    it('should return null if stop not found', async () => {
      stopRepo.findStopById.mockResolvedValue(null);

      const result = await StopService.getStopById('unknown');

      expect(stopRepo.findStopById).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      stopRepo.findStopById.mockRejectedValue(error);

      await expect(StopService.getStopById('1')).rejects.toThrow('Retrieval failed');
      expect(stopRepo.findStopById).toHaveBeenCalledWith('1');
    });
  });

  describe('modifyStop', () => {
    it('should update the stop and return the updated stop', async () => {
      const updateData = { name: 'Main Street Updated', location: 'Midtown' };
      const updatedStop = { _id: '1', ...updateData };
      stopRepo.updateStop.mockResolvedValue(updatedStop);

      const result = await StopService.modifyStop('1', updateData);

      expect(stopRepo.updateStop).toHaveBeenCalledWith('1', updateData);
      expect(result).toEqual(updatedStop);
    });

    it('should return null if stop to update is not found', async () => {
      const updateData = { name: 'Main Street Updated', location: 'Midtown' };
      stopRepo.updateStop.mockResolvedValue(null);

      const result = await StopService.modifyStop('unknown', updateData);

      expect(stopRepo.updateStop).toHaveBeenCalledWith('unknown', updateData);
      expect(result).toBeNull();
    });

    it('should throw an error if update fails', async () => {
      const updateData = { name: 'Main Street Updated', location: 'Midtown' };
      const error = new Error('Update failed');
      stopRepo.updateStop.mockRejectedValue(error);

      await expect(StopService.modifyStop('1', updateData)).rejects.toThrow('Update failed');
      expect(stopRepo.updateStop).toHaveBeenCalledWith('1', updateData);
    });
  });

  describe('removeStop', () => {
    it('should remove the stop and return the deleted stop', async () => {
      const deletedStop = { _id: '1', name: 'Main Street', location: 'Downtown' };
      stopRepo.deleteStop.mockResolvedValue(deletedStop);

      const result = await StopService.removeStop('1');

      expect(stopRepo.deleteStop).toHaveBeenCalledWith('1');
      expect(result).toEqual(deletedStop);
    });

    it('should return null if stop to delete is not found', async () => {
      stopRepo.deleteStop.mockResolvedValue(null);

      const result = await StopService.removeStop('unknown');

      expect(stopRepo.deleteStop).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if deletion fails', async () => {
      const error = new Error('Deletion failed');
      stopRepo.deleteStop.mockRejectedValue(error);

      await expect(StopService.removeStop('1')).rejects.toThrow('Deletion failed');
      expect(stopRepo.deleteStop).toHaveBeenCalledWith('1');
    });
  });
});