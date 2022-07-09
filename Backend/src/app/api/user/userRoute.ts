import express from 'express';
import { isAuth } from '../utils/helpers/auth/jwt';
import { UserController } from './userController';

const router = express.Router();
const user = new UserController();

router.route('/register').post(user.postUser);
router.route('/user/:id').get(isAuth, user.getSingleUser);
router.route('/login').post(user.logInUser);
router.route('/logout').get(user.logout);
export default router;
