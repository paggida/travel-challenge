const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./app/services/swagger.json');
const routes = require('./routes');

class App {
  constructor()
  {
    this.express = express();

    this.middlewares();
    this.security();
    this.routes();
    this.exception();
  }

  middlewares()
  {
    this.express.use(express.json());
    this.express.use(cors());
  }
  security()
  {
    this.express.disable('x-powered-by');
    this.express.disable('etag');
  }
  routes()
  {
    this.express.use('/travel-api/', routes);
    this.express.use('/travel-api/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
  exception()
  {
    /* In production returns standard error, in other environments
       returns errors treated in JSON format.*/
    this.express.use(async (err , req, res, next) => {
      if (process.env.NODE_ENV !== 'production') {
        return res.status(500).json({ message: err.message });
      }
      return res.status(500).json({
        message: 'Internal server error, please try again later'
      });
    });
  }
}

module.exports = new App().express;
