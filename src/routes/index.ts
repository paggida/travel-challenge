import { Router } from 'express';
import routeRouter from './route.routes';

const routes = Router();

routes.use('/route', routeRouter);

export default routes;
