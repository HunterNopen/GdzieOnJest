const LocationService = require('../../../app-back-goj/services/LocationService');
const locationRepo = require('../../../app-back-goj/repositories/LocationRepository');

jest.mock('../../../app-back-goj/repositories/LocationRepository');

describe('LocationService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addNewLocation', () => {
    it('should add a new location and return the created location', async () => {
      const locationData = { name: 'Central Park', address: 'New York' };
      const createdLocation = { _id: '1', ...locationData };
      locationRepo.createLocation.mockResolvedValue(createdLocation);

      const result = await LocationService.addNewLocation(locationData);

      expect(locationRepo.createLocation).toHaveBeenCalledWith(locationData);
      expect(result).toEqual(createdLocation);
    });

    it('should throw an error if creation fails', async () => {
      const locationData = { name: 'Central Park', address: 'New York' };
      const error = new Error('Creation failed');
      locationRepo.createLocation.mockRejectedValue(error);

      await expect(LocationService.addNewLocation(locationData)).rejects.toThrow('Creation failed');
      expect(locationRepo.createLocation).toHaveBeenCalledWith(locationData);
    });
  });

  describe('getAllLocations', () => {
    it('should return a list of all locations', async () => {
      const locations = [
        { _id: '1', name: 'Central Park', address: 'New York' },
        { _id: '2', name: 'Golden Gate Bridge', address: 'San Francisco' },
      ];
      locationRepo.findAllLocations.mockResolvedValue(locations);

      const result = await LocationService.getAllLocations();

      expect(locationRepo.findAllLocations).toHaveBeenCalled();
      expect(result).toEqual(locations);
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      locationRepo.findAllLocations.mockRejectedValue(error);

      await expect(LocationService.getAllLocations()).rejects.toThrow('Retrieval failed');
      expect(locationRepo.findAllLocations).toHaveBeenCalled();
    });
  });

  describe('getLocationById', () => {
    it('should return the location if found', async () => {
      const location = { _id: '1', name: 'Central Park', address: 'New York' };
      locationRepo.findLocationById.mockResolvedValue(location);

      const result = await LocationService.getLocationById('1');

      expect(locationRepo.findLocationById).toHaveBeenCalledWith('1');
      expect(result).toEqual(location);
    });

    it('should return null if location not found', async () => {
      locationRepo.findLocationById.mockResolvedValue(null);

      const result = await LocationService.getLocationById('unknown');

      expect(locationRepo.findLocationById).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      locationRepo.findLocationById.mockRejectedValue(error);

      await expect(LocationService.getLocationById('1')).rejects.toThrow('Retrieval failed');
      expect(locationRepo.findLocationById).toHaveBeenCalledWith('1');
    });
  });

  describe('modifyLocation', () => {
    it('should update the location and return the updated location', async () => {
      const updateData = { name: 'Central Park Updated', address: 'New York, NY' };
      const updatedLocation = { _id: '1', ...updateData };
      locationRepo.updateLocation.mockResolvedValue(updatedLocation);

      const result = await LocationService.modifyLocation('1', updateData);

      expect(locationRepo.updateLocation).toHaveBeenCalledWith('1', updateData);
      expect(result).toEqual(updatedLocation);
    });

    it('should return null if location to update is not found', async () => {
      const updateData = { name: 'Central Park Updated', address: 'New York, NY' };
      locationRepo.updateLocation.mockResolvedValue(null);

      const result = await LocationService.modifyLocation('unknown', updateData);

      expect(locationRepo.updateLocation).toHaveBeenCalledWith('unknown', updateData);
      expect(result).toBeNull();
    });

    it('should throw an error if update fails', async () => {
      const updateData = { name: 'Central Park Updated', address: 'New York, NY' };
      const error = new Error('Update failed');
      locationRepo.updateLocation.mockRejectedValue(error);

      await expect(LocationService.modifyLocation('1', updateData)).rejects.toThrow('Update failed');
      expect(locationRepo.updateLocation).toHaveBeenCalledWith('1', updateData);
    });
  });

  describe('removeLocation', () => {
    it('should remove the location and return the deleted location', async () => {
      const deletedLocation = { _id: '1', name: 'Central Park', address: 'New York' };
      locationRepo.deleteLocation.mockResolvedValue(deletedLocation);

      const result = await LocationService.removeLocation('1');

      expect(locationRepo.deleteLocation).toHaveBeenCalledWith('1');
      expect(result).toEqual(deletedLocation);
    });

    it('should return null if location to delete is not found', async () => {
      locationRepo.deleteLocation.mockResolvedValue(null);

      const result = await LocationService.removeLocation('unknown');

      expect(locationRepo.deleteLocation).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if deletion fails', async () => {
      const error = new Error('Deletion failed');
      locationRepo.deleteLocation.mockRejectedValue(error);

      await expect(LocationService.removeLocation('1')).rejects.toThrow('Deletion failed');
      expect(locationRepo.deleteLocation).toHaveBeenCalledWith('1');
    });
  });
});