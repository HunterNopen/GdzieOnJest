const RouteController = require('../../../app-back-goj/controllers/RouteController');
const routeService = require('../../../app-back-goj/services/RouteService');

jest.mock('../../../app-back-goj/services/RouteService');

describe('RouteController', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      headersSent: false,
    };
  });

  describe('createRoute', () => {
    it('should create a new route and return 201 with the route object', async () => {
      const mockRoute = { _id: '1', routeName: 'TestRoute' };
      routeService.addNewRoute.mockResolvedValue(mockRoute);

      mockReq.body = { routeName: 'TestRoute' };
      await RouteController.createRoute(mockReq, mockRes);

      expect(routeService.addNewRoute).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockRoute);
    });

    it('should return 500 if there is an error', async () => {
      routeService.addNewRoute.mockRejectedValue(new Error('Test error'));

      await RouteController.createRoute(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Test error' });
    });
  });

  describe('getAllRoutes', () => {
    it('should return 200 and list of routes', async () => {
      const mockRoutes = [{ _id: '1' }, { _id: '2' }];
      routeService.getAllRoutes.mockResolvedValue(mockRoutes);

      await RouteController.getAllRoutes(mockReq, mockRes);

      expect(routeService.getAllRoutes).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockRoutes);
    });

    it('should return 500 on error', async () => {
      const error = new Error('GetAll error');
      routeService.getAllRoutes.mockRejectedValue(error);

      await RouteController.getAllRoutes(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'GetAll error' });
    });
  });

  describe('getRouteById', () => {
    it('should return 200 and the route object if found', async () => {
      const mockRoute = { _id: '1', routeName: 'TestRoute' };
      routeService.getRouteById.mockResolvedValue(mockRoute);

      mockReq.params.id = '1';
      await RouteController.getRouteById(mockReq, mockRes);

      expect(routeService.getRouteById).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockRoute);
    });

    it('should return 404 if route not found', async () => {
      routeService.getRouteById.mockResolvedValue(null);

      mockReq.params.id = 'unknown';
      await RouteController.getRouteById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Route not found' });
    });

    it('should return 500 on error', async () => {
      routeService.getRouteById.mockRejectedValue(new Error('Test error'));

      await RouteController.getRouteById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Test error' });
    });
  });

  describe('updateRoute', () => {
    it('should return 200 with updated route if successful', async () => {
      const updatedRoute = { _id: '1', routeName: 'UpdatedRoute' };
      routeService.modifyRoute.mockResolvedValue(updatedRoute);

      mockReq.params.id = '1';
      mockReq.body = { routeName: 'UpdatedRoute' };
      await RouteController.updateRoute(mockReq, mockRes);

      expect(routeService.modifyRoute).toHaveBeenCalledWith('1', { routeName: 'UpdatedRoute' });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(updatedRoute);
    });

    it('should return 404 if route not found', async () => {
      routeService.modifyRoute.mockResolvedValue(null);

      mockReq.params.id = '404';
      await RouteController.updateRoute(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Route not found' });
    });

    it('should return 500 on error', async () => {
      routeService.modifyRoute.mockRejectedValue(new Error('Update error'));

      await RouteController.updateRoute(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Update error' });
    });
  });

  describe('deleteRoute', () => {
    it('should return 200 and deleted route if successful', async () => {
      const mockDeleted = { _id: '1', routeName: 'Removed' };
      routeService.removeRoute.mockResolvedValue(mockDeleted);

      mockReq.params.id = '1';
      await RouteController.deleteRoute(mockReq, mockRes);

      expect(routeService.removeRoute).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockDeleted);
    });

    it('should return 404 if route not found', async () => {
      routeService.removeRoute.mockResolvedValue(null);

      mockReq.params.id = '404';
      await RouteController.deleteRoute(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Route not found' });
    });

    it('should return 500 on error', async () => {
      routeService.removeRoute.mockRejectedValue(new Error('Delete error'));

      await RouteController.deleteRoute(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Delete error' });
    });
  });
});