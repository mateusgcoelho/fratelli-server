import { Router } from 'express';

import ProductController from 'controllers/ProductController';
import multer from 'multer';

import uploadConfig from 'config/uploadConfig';

import ensureAuthenticated from 'middlewares/ensureAuthenticated';
import { is } from 'middlewares/permission';

const productRoutes = Router();

const upload = multer(uploadConfig.multer);

const productController = new ProductController();

productRoutes.post(
  '/',
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  upload.single('photo'),
  productController.create
);

productRoutes.get('/', productController.index);

export default productRoutes;
