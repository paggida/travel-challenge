import { Router } from 'express';
const routeRouter = Router();
import * as routesController from '../app/services/controllers/routesController';

routeRouter.post('/', routesController.setNew);
routeRouter.get('/getCheapest/:originDestination/:targetDestination', routesController.getCheapest);

export default routeRouter;
