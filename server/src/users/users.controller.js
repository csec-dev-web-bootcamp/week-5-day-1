import express from 'express';
import { authGuard } from '../auth/auth.guard';
import { asyncHandler } from '../common/async-handler';
import {
  getOneUser
} from './users.service';

const usersController = express.Router();

usersController.get(
  '/me',
  authGuard,
  asyncHandler(async (req, res) => {
    const user = await getOneUser(req.user.id);
    return res.json(user);
  }),
);

export default usersController;
