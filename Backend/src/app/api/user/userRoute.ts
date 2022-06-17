import express from 'express';
import { UserController } from './userController';

const router = express.Router();
const user = new UserController();

router.route('/register').post(user.postUser);

export default router;
