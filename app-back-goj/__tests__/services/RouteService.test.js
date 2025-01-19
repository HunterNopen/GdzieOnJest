const RouteService = require('../../../app-back-goj/services/RouteService');
const routeRepo = require('../../../app-back-goj/repositories/RouteRepository');

jest.mock('../../../app-back-goj/repositories/RouteRepository');

describe('RouteService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addNewRoute', () => {
    it('should add a new route and return the created route', async () => {
      const routeData = { routeNumber: 'R123', stops: ['Stop1', 'Stop2'] };
      const createdRoute = { _id: '1', ...routeData };
      routeRepo.createRoute.mockResolvedValue(createdRoute);

      const result = await RouteService.addNewRoute(routeData);

      expect(routeRepo.createRoute).toHaveBeenCalledWith(routeData);
      expect(result).toEqual(createdRoute);
    });

    it('should throw an error if creation fails', async () => {
      const routeData = { routeNumber: 'R123', stops: ['Stop1', 'Stop2'] };
      const error = new Error('Creation failed');
      routeRepo.createRoute.mockRejectedValue(error);

      await expect(RouteService.addNewRoute(routeData)).rejects.toThrow('Creation failed');
      expect(routeRepo.createRoute).toHaveBeenCalledWith(routeData);
    });
  });

  describe('getAllRoutes', () => {
    it('should return a list of all routes', async () => {
      const routes = [
        { _id: '1', routeNumber: 'R123', stops: ['Stop1', 'Stop2'] },
        { _id: '2', routeNumber: 'R456', stops: ['Stop3', 'Stop4'] },
      ];
      routeRepo.findAllRoutes.mockResolvedValue(routes);

      const result = await RouteService.getAllRoutes();

      expect(routeRepo.findAllRoutes).toHaveBeenCalled();
      expect(result).toEqual(routes);
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      routeRepo.findAllRoutes.mockRejectedValue(error);

      await expect(RouteService.getAllRoutes()).rejects.toThrow('Retrieval failed');
      expect(routeRepo.findAllRoutes).toHaveBeenCalled();
    });
  });

  describe('getRouteById', () => {
    it('should return the route if found', async () => {
      const route = { _id: '1', routeNumber: 'R123', stops: ['Stop1', 'Stop2'] };
      routeRepo.findRouteById.mockResolvedValue(route);

      const result = await RouteService.getRouteById('1');

      expect(routeRepo.findRouteById).toHaveBeenCalledWith('1');
      expect(result).toEqual(route);
    });

    it('should return null if route not found', async () => {
      routeRepo.findRouteById.mockResolvedValue(null);

      const result = await RouteService.getRouteById('unknown');

      expect(routeRepo.findRouteById).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval failed');
      routeRepo.findRouteById.mockRejectedValue(error);

      await expect(RouteService.getRouteById('1')).rejects.toThrow('Retrieval failed');
      expect(routeRepo.findRouteById).toHaveBeenCalledWith('1');
    });
  });

  describe('modifyRoute', () => {
    it('should update the route and return the updated route', async () => {
      const updateData = { routeNumber: 'R123-Updated', stops: ['Stop1', 'Stop2', 'Stop3'] };
      const updatedRoute = { _id: '1', ...updateData };
      routeRepo.updateRoute.mockResolvedValue(updatedRoute);

      const result = await RouteService.modifyRoute('1', updateData);

      expect(routeRepo.updateRoute).toHaveBeenCalledWith('1', updateData);
      expect(result).toEqual(updatedRoute);
    });

    it('should return null if route to update is not found', async () => {
      const updateData = { routeNumber: 'R123-Updated', stops: ['Stop1', 'Stop2', 'Stop3'] };
      routeRepo.updateRoute.mockResolvedValue(null);

      const result = await RouteService.modifyRoute('unknown', updateData);

      expect(routeRepo.updateRoute).toHaveBeenCalledWith('unknown', updateData);
      expect(result).toBeNull();
    });

    it('should throw an error if update fails', async () => {
      const updateData = { routeNumber: 'R123-Updated', stops: ['Stop1', 'Stop2', 'Stop3'] };
      const error = new Error('Update failed');
      routeRepo.updateRoute.mockRejectedValue(error);

      await expect(RouteService.modifyRoute('1', updateData)).rejects.toThrow('Update failed');
      expect(routeRepo.updateRoute).toHaveBeenCalledWith('1', updateData);
    });
  });

  describe('removeRoute', () => {
    it('should remove the route and return the deleted route', async () => {
      const deletedRoute = { _id: '1', routeNumber: 'R123', stops: ['Stop1', 'Stop2'] };
      routeRepo.deleteRoute.mockResolvedValue(deletedRoute);

      const result = await RouteService.removeRoute('1');

      expect(routeRepo.deleteRoute).toHaveBeenCalledWith('1');
      expect(result).toEqual(deletedRoute);
    });

    it('should return null if route to delete is not found', async () => {
      routeRepo.deleteRoute.mockResolvedValue(null);

      const result = await RouteService.removeRoute('unknown');

      expect(routeRepo.deleteRoute).toHaveBeenCalledWith('unknown');
      expect(result).toBeNull();
    });

    it('should throw an error if deletion fails', async () => {
      const error = new Error('Deletion failed');
      routeRepo.deleteRoute.mockRejectedValue(error);

      await expect(RouteService.removeRoute('1')).rejects.toThrow('Deletion failed');
      expect(routeRepo.deleteRoute).toHaveBeenCalledWith('1');
    });
  });
});