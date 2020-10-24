import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import path from 'path';
import 'express-async-errors';

import AppError from './errors/AppError';

import routes from 'routes';
import { errors } from 'celebrate';

import './database';
import uploadConfig from 'config/uploadConfig';

const server = express();

server.use(express.json());
server.use(cors());

server.use('/files', express.static(uploadConfig.tmpFolder));
server.use(routes);

server.use(errors());
server.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: `error ${err.statusCode}`,
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Unexpected error',
  });
});

server.listen(3333, () => console.log('Server is running in port 3333'));
