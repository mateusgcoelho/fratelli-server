import { Router } from 'express';

import PermissionController from 'controllers/PermissionController';

import ensureAuthenticated from 'middlewares/ensureAuthenticated';
import { is } from 'middlewares/permission';

const permissionRoutes = Router();

const permissionController = new PermissionController();

permissionRoutes.post(
  '/',
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  permissionController.create
);

export default permissionRoutes;
