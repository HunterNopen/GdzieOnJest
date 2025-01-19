const BusRepository = require('../../../app-back-goj/repositories/BusRepository');
const Bus = require('../../../app-back-goj/models/Bus');

jest.mock('../../../app-back-goj/models/Bus');

describe('BusRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createBus', () => {
    it('should create a new bus and return the created bus', async () => {
      const busData = { busNumber: 'BUS123', route: 'Route1' };
      const createdBus = { _id: '1', ...busData };

      const saveMock = jest.fn().mockResolvedValue(createdBus);
      Bus.mockImplementation(() => ({
        save: saveMock,
      }));

      const result = await BusRepository.createBus(busData);

      expect(Bus).toHaveBeenCalledWith(busData);
      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(createdBus);
    });

    it('should throw an error if creation fails', async () => {
      const busData = { busNumber: 'BUS123', route: 'Route1' };
      const error = new Error('Creation failed');

      const saveMock = jest.fn().mockRejectedValue(error);
      Bus.mockImplementation(() => ({
        save: saveMock,
      }));

      await expect(BusRepository.createBus(busData)).rejects.toThrow('Creation failed');

      expect(Bus).toHaveBeenCalledWith(busData);
      expect(saveMock).toHaveBeenCalled();
    });
  });

  describe('findAllBuses', () => {
    it('should return a list of all buses', async () => {
      const buses = [
        { _id: '1', busNumber: 'BUS123', route: 'Route1' },
        { _id: '2', busNumber: 'BUS456', route: 'Route2' },
      ];

      Bus.find.mockResolvedValue(buses);

      const result = await BusRepository.findAllBuses();

      expect(Bus.find).toHaveBeenCalledWith();
      expect(result).toEqual(buses);
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      Bus.find.mockRejectedValue(error);

      await expect(BusRepository.findAllBuses()).rejects.toThrow('Retrieval failed');

      expect(Bus.find).toHaveBeenCalledWith();
    });
  });

  describe('findBusById', () => {
    it('should return the bus if found', async () => {
      const bus = { _id: '1', busNumber: 'BUS123', route: 'Route1' };
      Bus.findById.mockResolvedValue(bus);

      const result = await BusRepository.findBusById('1');

      expect(Bus.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(bus);
    });

    it('should return null if bus not found', async () => {
      Bus.findById.mockResolvedValue(null);

      const result = await BusRepository.findBusById('unknown');

      expect(Bus.findById).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      Bus.findById.mockRejectedValue(error);

      await expect(BusRepository.findBusById('1')).rejects.toThrow('Retrieval failed');

      expect(Bus.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('updateBus', () => {
    it('should update the bus and return the updated bus', async () => {
      const updateData = { busNumber: 'BUS789', route: 'Route3' };
      const updatedBus = { _id: '1', ...updateData };
      Bus.findByIdAndUpdate.mockResolvedValue(updatedBus);

      const result = await BusRepository.updateBus('1', updateData);

      expect(Bus.findByIdAndUpdate).toHaveBeenCalledWith('1', updateData, { new: true });
      expect(result).toEqual(updatedBus);
    });

    it('should return null if bus to update is not found', async () => {
      const updateData = { busNumber: 'BUS789', route: 'Route3' };
      Bus.findByIdAndUpdate.mockResolvedValue(null);

      const result = await BusRepository.updateBus('unknown', updateData);

      expect(Bus.findByIdAndUpdate).toHaveBeenCalledWith('unknown', updateData, { new: true });
      expect(result).toBeNull();
    });

    it('should throw an error if update fails', async () => {
      const updateData = { busNumber: 'BUS789', route: 'Route3' };
      const error = new Error('Update failed');
      Bus.findByIdAndUpdate.mockRejectedValue(error);

      await expect(BusRepository.updateBus('1', updateData)).rejects.toThrow('Update failed');

      expect(Bus.findByIdAndUpdate).toHaveBeenCalledWith('1', updateData, { new: true });
    });
  });

  describe('deleteBus', () => {
    it('should delete the bus and return the deleted bus', async () => {
      const deletedBus = { _id: '1', busNumber: 'BUS123', route: 'Route1' };
      Bus.findByIdAndDelete.mockResolvedValue(deletedBus);

      const result = await BusRepository.deleteBus('1');

      expect(Bus.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(result).toEqual(deletedBus);
    });

    it('should return null if bus to delete is not found', async () => {
      Bus.findByIdAndDelete.mockResolvedValue(null);

      const result = await BusRepository.deleteBus('unknown');

      expect(Bus.findByIdAndDelete).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if deletion fails', async () => {
      const error = new Error('Deletion failed');
      Bus.findByIdAndDelete.mockRejectedValue(error);

      await expect(BusRepository.deleteBus('1')).rejects.toThrow('Deletion failed');

      expect(Bus.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });
});