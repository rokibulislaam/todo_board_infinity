import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import { Routes } from '@interfaces/routes.interface';
import { LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from '@config';
import { logger, stream } from '@utils/logger';
import mongoose from 'mongoose';
import { dbConnection } from './databases';
import helmet from 'helmet';
export class App {
  public app: express.Application;
  public env: string;
  public port: number | string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3001;
    this.initDatabase();
    this.initMiddlewares();
    this.initRoutes(routes);
  }

  public startServer() {
    this.app.listen(this.port, () => {
      logger.info(`Server listening on port: ${this.port}`);
    });
  }

  private initDatabase() {
    if (this.env !== 'production') {
      mongoose.set('debug', true);
    }
    mongoose.connect(dbConnection.url as string, (err) => {
      if (err) {
        logger.error(err);
        process.exit(1);
      } else {
        logger.info('MongoDB connected');
      }
    });
  }
  private initMiddlewares() {
    this.app.use(morgan(LOG_FORMAT || 'dev', { stream }));
    this.app.use(cors({ origin: ORIGIN }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  private initRoutes(routes: Routes[]) {
    for (const route of routes) {
      this.app.use('/', route.router);
    }
  }
}
