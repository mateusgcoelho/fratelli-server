import { Router } from 'express';

import userRoutes from 'routes/users.routes';
import sessionRoutes from 'routes/session.routes';
import permissionRoutes from 'routes/permission.routes';
import roleRoutes from 'routes/role.routes';
import productRoutes from 'routes/product.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/permissions', permissionRoutes);
routes.use('/roles', roleRoutes);
routes.use('/products', productRoutes);

export default routes;
