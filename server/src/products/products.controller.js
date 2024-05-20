import express from 'express';
import { authGuard } from '../auth/auth.guard';
import { roleGuard } from '../auth/role.guard';
import { asyncHandler } from '../common/async-handler';
import { createProductPipe, updateProductPipe } from './products.pipe';
import {
  createProduct,
  deleteProduct,
  getManyProducts,
  getOneProduct,
  updateProduct,
} from './products.service';

const productsController = express.Router();

productsController.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await getManyProducts();
    return res.json(products);
  }),
);

productsController.post(
  '/',
  authGuard,
  roleGuard(['CUSTOMER', 'OWNER']),
  createProductPipe,
  asyncHandler(async (req, res) => {
    const data = req.body;
    const product = await createProduct(data);
    return res.json(product);
  }),
);

productsController.get(
  '/:id',
  authGuard,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await getOneProduct(id);
    return res.json(product);
  }),
);

productsController.put(
  '/:id',
  updateProductPipe,
  asyncHandler(async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    const product = await updateProduct(id, data);
    return res.json(product);
  }),
);

productsController.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await deleteProduct(id);
    return res.json(product);
  }),
);

export default productsController;
