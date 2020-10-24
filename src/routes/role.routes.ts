import { Router } from 'express';

import RoleController from 'controllers/RoleController';

import ensureAuthenticated from 'middlewares/ensureAuthenticated';
import { is } from 'middlewares/permission';

const roleRoutes = Router();

const rolesController = new RoleController();

roleRoutes.post(
  '/',
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  rolesController.create
);

export default roleRoutes;
