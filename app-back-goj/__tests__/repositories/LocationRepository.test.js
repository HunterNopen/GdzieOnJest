const LocationRepository = require('../../../app-back-goj/repositories/LocationRepository');
const Location = require('../../../app-back-goj/models/Location');

jest.mock('../../../app-back-goj/models/Location');

describe('LocationRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createLocation', () => {
    it('should create a new location and return the created location', async () => {
      const locationData = { name: 'Central Park', address: 'New York' };
      const createdLocation = { _id: '1', ...locationData };

      const saveMock = jest.fn().mockResolvedValue(createdLocation);
      Location.mockImplementation(() => ({
        save: saveMock,
      }));

      const result = await LocationRepository.createLocation(locationData);

      expect(Location).toHaveBeenCalledWith(locationData);
      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(createdLocation);
    });

    it('should throw an error if creation fails', async () => {
      const locationData = { name: 'Central Park', address: 'New York' };
      const error = new Error('Creation failed');

      const saveMock = jest.fn().mockRejectedValue(error);
      Location.mockImplementation(() => ({
        save: saveMock,
      }));

      await expect(LocationRepository.createLocation(locationData)).rejects.toThrow('Creation failed');

      expect(Location).toHaveBeenCalledWith(locationData);
      expect(saveMock).toHaveBeenCalled();
    });
  });

  describe('findAllLocations', () => {
    it('should return a list of all locations', async () => {
      const locations = [
        { _id: '1', name: 'Central Park', address: 'New York' },
        { _id: '2', name: 'Golden Gate Bridge', address: 'San Francisco' },
      ];

      Location.find.mockResolvedValue(locations);

      const result = await LocationRepository.findAllLocations();

      expect(Location.find).toHaveBeenCalledWith();
      expect(result).toEqual(locations);
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      Location.find.mockRejectedValue(error);

      await expect(LocationRepository.findAllLocations()).rejects.toThrow('Retrieval failed');

      expect(Location.find).toHaveBeenCalledWith();
    });
  });

  describe('findLocationById', () => {
    it('should return the location if found', async () => {
      const location = { _id: '1', name: 'Central Park', address: 'New York' };
      Location.findById.mockResolvedValue(location);

      const result = await LocationRepository.findLocationById('1');

      expect(Location.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(location);
    });

    it('should return null if location not found', async () => {
      Location.findById.mockResolvedValue(null);

      const result = await LocationRepository.findLocationById('unknown');

      expect(Location.findById).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      Location.findById.mockRejectedValue(error);

      await expect(LocationRepository.findLocationById('1')).rejects.toThrow('Retrieval failed');

      expect(Location.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('updateLocation', () => {
    it('should update the location and return the updated location', async () => {
      const updateData = { name: 'Central Park Updated', address: 'New York, NY' };
      const updatedLocation = { _id: '1', ...updateData };
      Location.findByIdAndUpdate.mockResolvedValue(updatedLocation);

      const result = await LocationRepository.updateLocation('1', updateData);

      expect(Location.findByIdAndUpdate).toHaveBeenCalledWith('1', updateData, { new: true });
      expect(result).toEqual(updatedLocation);
    });

    it('should return null if location to update is not found', async () => {
      const updateData = { name: 'Central Park Updated', address: 'New York, NY' };
      Location.findByIdAndUpdate.mockResolvedValue(null);

      const result = await LocationRepository.updateLocation('unknown', updateData);

      expect(Location.findByIdAndUpdate).toHaveBeenCalledWith('unknown', updateData, { new: true });
      expect(result).toBeNull();
    });

    it('should throw an error if update fails', async () => {
      const updateData = { name: 'Central Park Updated', address: 'New York, NY' };
      const error = new Error('Update failed');
      Location.findByIdAndUpdate.mockRejectedValue(error);

      await expect(LocationRepository.updateLocation('1', updateData)).rejects.toThrow('Update failed');

      expect(Location.findByIdAndUpdate).toHaveBeenCalledWith('1', updateData, { new: true });
    });
  });

  describe('deleteLocation', () => {
    it('should delete the location and return the deleted location', async () => {
      const deletedLocation = { _id: '1', name: 'Central Park', address: 'New York' };
      Location.findByIdAndDelete.mockResolvedValue(deletedLocation);

      const result = await LocationRepository.deleteLocation('1');

      expect(Location.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(result).toEqual(deletedLocation);
    });

    it('should return null if location to delete is not found', async () => {
      Location.findByIdAndDelete.mockResolvedValue(null);

      const result = await LocationRepository.deleteLocation('unknown');

      expect(Location.findByIdAndDelete).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if deletion fails', async () => {
      const error = new Error('Deletion failed');
      Location.findByIdAndDelete.mockRejectedValue(error);

      await expect(LocationRepository.deleteLocation('1')).rejects.toThrow('Deletion failed');

      expect(Location.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });
});