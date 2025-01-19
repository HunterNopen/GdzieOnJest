const BusService = require('../../../app-back-goj/services/BusService');
const busRepo = require('../../../app-back-goj/repositories/BusRepository');

jest.mock('../../../app-back-goj/repositories/BusRepository');

describe('BusService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addNewBus', () => {
    it('should add a new bus and return the created bus', async () => {
      const busData = { busNumber: 'BUS123', route: 'Route1' };
      const createdBus = { _id: '1', ...busData };
      busRepo.createBus.mockResolvedValue(createdBus);

      const result = await BusService.addNewBus(busData);

      expect(busRepo.createBus).toHaveBeenCalledWith(busData);
      expect(result).toEqual(createdBus);
    });

    it('should throw an error if creation fails', async () => {
      const busData = { busNumber: 'BUS123', route: 'Route1' };
      const error = new Error('Creation failed');
      busRepo.createBus.mockRejectedValue(error);

      await expect(BusService.addNewBus(busData)).rejects.toThrow('Creation failed');
      expect(busRepo.createBus).toHaveBeenCalledWith(busData);
    });
  });

  describe('getAllBuses', () => {
    it('should return a list of all buses', async () => {
      const buses = [
        { _id: '1', busNumber: 'BUS123', route: 'Route1' },
        { _id: '2', busNumber: 'BUS456', route: 'Route2' },
      ];
      busRepo.findAllBuses.mockResolvedValue(buses);

      const result = await BusService.getAllBuses();

      expect(busRepo.findAllBuses).toHaveBeenCalled();
      expect(result).toEqual(buses);
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      busRepo.findAllBuses.mockRejectedValue(error);

      await expect(BusService.getAllBuses()).rejects.toThrow('Retrieval failed');
      expect(busRepo.findAllBuses).toHaveBeenCalled();
    });
  });

  describe('getBusById', () => {
    it('should return the bus if found', async () => {
      const bus = { _id: '1', busNumber: 'BUS123', route: 'Route1' };
      busRepo.findBusById.mockResolvedValue(bus);

      const result = await BusService.getBusById('1');

      expect(busRepo.findBusById).toHaveBeenCalledWith('1');
      expect(result).toEqual(bus);
    });

    it('should return null if bus not found', async () => {
      busRepo.findBusById.mockResolvedValue(null);

      const result = await BusService.getBusById('unknown');

      expect(busRepo.findBusById).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      busRepo.findBusById.mockRejectedValue(error);

      await expect(BusService.getBusById('1')).rejects.toThrow('Retrieval failed');
      expect(busRepo.findBusById).toHaveBeenCalledWith('1');
    });
  });

  describe('modifyBus', () => {
    it('should update the bus and return the updated bus', async () => {
      const updateData = { busNumber: 'BUS789', route: 'Route3' };
      const updatedBus = { _id: '1', ...updateData };
      busRepo.updateBus.mockResolvedValue(updatedBus);

      const result = await BusService.modifyBus('1', updateData);

      expect(busRepo.updateBus).toHaveBeenCalledWith('1', updateData);
      expect(result).toEqual(updatedBus);
    });

    it('should return null if bus to update is not found', async () => {
      const updateData = { busNumber: 'BUS789', route: 'Route3' };
      busRepo.updateBus.mockResolvedValue(null);

      const result = await BusService.modifyBus('unknown', updateData);

      expect(busRepo.updateBus).toHaveBeenCalledWith('unknown', updateData);
      expect(result).toBeNull();
    });

    it('should throw an error if update fails', async () => {
      const updateData = { busNumber: 'BUS789', route: 'Route3' };
      const error = new Error('Update failed');
      busRepo.updateBus.mockRejectedValue(error);

      await expect(BusService.modifyBus('1', updateData)).rejects.toThrow('Update failed');
      expect(busRepo.updateBus).toHaveBeenCalledWith('1', updateData);
    });
  });

  describe('removeBus', () => {
    it('should remove the bus and return the deleted bus', async () => {
      const deletedBus = { _id: '1', busNumber: 'BUS123', route: 'Route1' };
      busRepo.deleteBus.mockResolvedValue(deletedBus);

      const result = await BusService.removeBus('1');

      expect(busRepo.deleteBus).toHaveBeenCalledWith('1');
      expect(result).toEqual(deletedBus);
    });

    it('should return null if bus to delete is not found', async () => {
      busRepo.deleteBus.mockResolvedValue(null);

      const result = await BusService.removeBus('unknown');

      expect(busRepo.deleteBus).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if deletion fails', async () => {
      const error = new Error('Deletion failed');
      busRepo.deleteBus.mockRejectedValue(error);

      await expect(BusService.removeBus('1')).rejects.toThrow('Deletion failed');
      expect(busRepo.deleteBus).toHaveBeenCalledWith('1');
    });
  });
});