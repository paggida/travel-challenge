import express from 'express';
import { Application, Request, Response, NextFunction} from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './app/services/swagger.json';
import routes from './routes';

class App {
  Express: Application;

  constructor()
  {

    this.Express = express();

    this.middlewares();
    this.security();
    this.routes();
    this.exception();
  }

  middlewares()
  {
    this.Express.use(express.json());
    this.Express.use(cors());
  }
  security()
  {
    this.Express.disable('x-powered-by');
    this.Express.disable('etag');
  }
  routes()
  {
    this.Express.use('/travel-api/', routes);
    this.Express.use('/travel-api/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
  exception()
  {
    /* In production returns standard error, in other environments
       returns errors treated in JSON format.*/
    this.Express.use(async (err:Error , req:Request, res:Response, next:NextFunction) => {
      if (process.env.NODE_ENV !== 'production') {
        return res.status(500).json({ message: err.message });
      }
      return res.status(500).json({
        message: 'Internal server error, please try again later'
      });
    });
  }
}

export default new App().Express;
