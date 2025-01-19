const StopRepository = require('../../../app-back-goj/repositories/StopRepository');
const Stop = require('../../../app-back-goj/models/Stop');

jest.mock('../../../app-back-goj/models/Stop');

describe('StopRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createStop', () => {
    it('should create a new stop and return the created stop', async () => {
      const stopData = { name: 'Main Street', location: 'Downtown' };
      const createdStop = { _id: '1', ...stopData };

      const saveMock = jest.fn().mockResolvedValue(createdStop);
      Stop.mockImplementation(() => ({
        save: saveMock,
      }));

      const result = await StopRepository.createStop(stopData);

      expect(Stop).toHaveBeenCalledWith(stopData);
      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(createdStop);
    });

    it('should throw an error if creation fails', async () => {
      const stopData = { name: 'Main Street', location: 'Downtown' };
      const error = new Error('Creation failed');

      const saveMock = jest.fn().mockRejectedValue(error);
      Stop.mockImplementation(() => ({
        save: saveMock,
      }));

      await expect(StopRepository.createStop(stopData)).rejects.toThrow('Creation failed');

      expect(Stop).toHaveBeenCalledWith(stopData);
      expect(saveMock).toHaveBeenCalled();
    });
  });

  describe('findAllStops', () => {
    it('should return a list of all stops', async () => {
      const stops = [
        { _id: '1', name: 'Main Street', location: 'Downtown' },
        { _id: '2', name: 'Broadway', location: 'Uptown' },
      ];

      Stop.find.mockResolvedValue(stops);

      const result = await StopRepository.findAllStops();

      expect(Stop.find).toHaveBeenCalledWith();
      expect(result).toEqual(stops);
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      Stop.find.mockRejectedValue(error);

      await expect(StopRepository.findAllStops()).rejects.toThrow('Retrieval failed');

      expect(Stop.find).toHaveBeenCalledWith();
    });
  });

  describe('findStopById', () => {
    it('should return the stop if found', async () => {
      const stop = { _id: '1', name: 'Main Street', location: 'Downtown' };
      Stop.findById.mockResolvedValue(stop);

      const result = await StopRepository.findStopById('1');

      expect(Stop.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(stop);
    });

    it('should return null if stop not found', async () => {
      Stop.findById.mockResolvedValue(null);

      const result = await StopRepository.findStopById('unknown');

      expect(Stop.findById).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      Stop.findById.mockRejectedValue(error);

      await expect(StopRepository.findStopById('1')).rejects.toThrow('Retrieval failed');

      expect(Stop.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('updateStop', () => {
    it('should update the stop and return the updated stop', async () => {
      const updateData = { name: 'Main Street Updated', location: 'Midtown' };
      const updatedStop = { _id: '1', ...updateData };
      Stop.findByIdAndUpdate.mockResolvedValue(updatedStop);

      const result = await StopRepository.updateStop('1', updateData);

      expect(Stop.findByIdAndUpdate).toHaveBeenCalledWith('1', updateData, { new: true });
      expect(result).toEqual(updatedStop);
    });

    it('should return null if stop to update is not found', async () => {
      const updateData = { name: 'Main Street Updated', location: 'Midtown' };
      Stop.findByIdAndUpdate.mockResolvedValue(null);

      const result = await StopRepository.updateStop('unknown', updateData);

      expect(Stop.findByIdAndUpdate).toHaveBeenCalledWith('unknown', updateData, { new: true });
      expect(result).toBeNull();
    });

    it('should throw an error if update fails', async () => {
      const updateData = { name: 'Main Street Updated', location: 'Midtown' };
      const error = new Error('Update failed');
      Stop.findByIdAndUpdate.mockRejectedValue(error);

      await expect(StopRepository.updateStop('1', updateData)).rejects.toThrow('Update failed');

      expect(Stop.findByIdAndUpdate).toHaveBeenCalledWith('1', updateData, { new: true });
    });
  });

  describe('deleteStop', () => {
    it('should delete the stop and return the deleted stop', async () => {
      const deletedStop = { _id: '1', name: 'Main Street', location: 'Downtown' };
      Stop.findByIdAndDelete.mockResolvedValue(deletedStop);

      const result = await StopRepository.deleteStop('1');

      expect(Stop.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(result).toEqual(deletedStop);
    });

    it('should return null if stop to delete is not found', async () => {
      Stop.findByIdAndDelete.mockResolvedValue(null);

      const result = await StopRepository.deleteStop('unknown');

      expect(Stop.findByIdAndDelete).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if deletion fails', async () => {
      const error = new Error('Deletion failed');
      Stop.findByIdAndDelete.mockRejectedValue(error);

      await expect(StopRepository.deleteStop('1')).rejects.toThrow('Deletion failed');

      expect(Stop.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });
});