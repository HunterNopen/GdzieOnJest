const RouteRepository = require('../../../app-back-goj/repositories/RouteRepository');
const Route = require('../../../app-back-goj/models/Route');

jest.mock('../../../app-back-goj/models/Route');

describe('RouteRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRoute', () => {
    it('should create a new route and return the created route', async () => {
      const routeData = { routeNumber: 'R123', stops: ['Stop1', 'Stop2'] };
      const createdRoute = { _id: '1', ...routeData };

      const saveMock = jest.fn().mockResolvedValue(createdRoute);
      Route.mockImplementation(() => ({
        save: saveMock,
      }));

      const result = await RouteRepository.createRoute(routeData);

      expect(Route).toHaveBeenCalledWith(routeData);
      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(createdRoute);
    });

    it('should throw an error if creation fails', async () => {
      const routeData = { routeNumber: 'R123', stops: ['Stop1', 'Stop2'] };
      const error = new Error('Creation failed');

      const saveMock = jest.fn().mockRejectedValue(error);
      Route.mockImplementation(() => ({
        save: saveMock,
      }));

      await expect(RouteRepository.createRoute(routeData)).rejects.toThrow('Creation failed');

      expect(Route).toHaveBeenCalledWith(routeData);
      expect(saveMock).toHaveBeenCalled();
    });
  });

  describe('findAllRoutes', () => {
    it('should return a list of all routes', async () => {
      const routes = [
        { _id: '1', routeNumber: 'R123', stops: ['Stop1', 'Stop2'] },
        { _id: '2', routeNumber: 'R456', stops: ['Stop3', 'Stop4'] },
      ];

      Route.find.mockResolvedValue(routes);

      const result = await RouteRepository.findAllRoutes();

      expect(Route.find).toHaveBeenCalledWith();
      expect(result).toEqual(routes);
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      Route.find.mockRejectedValue(error);

      await expect(RouteRepository.findAllRoutes()).rejects.toThrow('Retrieval failed');

      expect(Route.find).toHaveBeenCalledWith();
    });
  });

  describe('findRouteById', () => {
    it('should return the route if found', async () => {
      const route = { _id: '1', routeNumber: 'R123', stops: ['Stop1', 'Stop2'] };
      Route.findById.mockResolvedValue(route);

      const result = await RouteRepository.findRouteById('1');

      expect(Route.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(route);
    });

    it('should return null if route not found', async () => {
      Route.findById.mockResolvedValue(null);

      const result = await RouteRepository.findRouteById('unknown');

      expect(Route.findById).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      Route.findById.mockRejectedValue(error);

      await expect(RouteRepository.findRouteById('1')).rejects.toThrow('Retrieval failed');

      expect(Route.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('updateRoute', () => {
    it('should update the route and return the updated route', async () => {
      const updateData = { routeNumber: 'R123-Updated', stops: ['Stop1', 'Stop2', 'Stop3'] };
      const updatedRoute = { _id: '1', ...updateData };
      Route.findByIdAndUpdate.mockResolvedValue(updatedRoute);

      const result = await RouteRepository.updateRoute('1', updateData);

      expect(Route.findByIdAndUpdate).toHaveBeenCalledWith('1', updateData, { new: true });
      expect(result).toEqual(updatedRoute);
    });

    it('should return null if route to update is not found', async () => {
      const updateData = { routeNumber: 'R123-Updated', stops: ['Stop1', 'Stop2', 'Stop3'] };
      Route.findByIdAndUpdate.mockResolvedValue(null);

      const result = await RouteRepository.updateRoute('unknown', updateData);

      expect(Route.findByIdAndUpdate).toHaveBeenCalledWith('unknown', updateData, { new: true });
      expect(result).toBeNull();
    });

    it('should throw an error if update fails', async () => {
      const updateData = { routeNumber: 'R123-Updated', stops: ['Stop1', 'Stop2', 'Stop3'] };
      const error = new Error('Update failed');
      Route.findByIdAndUpdate.mockRejectedValue(error);

      await expect(RouteRepository.updateRoute('1', updateData)).rejects.toThrow('Update failed');

      expect(Route.findByIdAndUpdate).toHaveBeenCalledWith('1', updateData, { new: true });
    });
  });

  describe('deleteRoute', () => {
    it('should delete the route and return the deleted route', async () => {
      const deletedRoute = { _id: '1', routeNumber: 'R123', stops: ['Stop1', 'Stop2'] };
      Route.findByIdAndDelete.mockResolvedValue(deletedRoute);

      const result = await RouteRepository.deleteRoute('1');

      expect(Route.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(result).toEqual(deletedRoute);
    });

    it('should return null if route to delete is not found', async () => {
      Route.findByIdAndDelete.mockResolvedValue(null);

      const result = await RouteRepository.deleteRoute('unknown');

      expect(Route.findByIdAndDelete).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if deletion fails', async () => {
      const error = new Error('Deletion failed');
      Route.findByIdAndDelete.mockRejectedValue(error);

      await expect(RouteRepository.deleteRoute('1')).rejects.toThrow('Deletion failed');

      expect(Route.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });
});