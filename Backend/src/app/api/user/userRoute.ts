import express from 'express';
import { isAuth } from '../utils/helpers/auth/jwt';
import { UserController } from './userController';

const router = express.Router();
const user = new UserController();

// route only posts users
router.route('/register').post(user.postUser);
// route posts users and tokens
router.route('/register2').post(user.postUserV2);
router.route('/user/:id').get(isAuth, user.getSingleUser);
router.route('/users').get(user.AllUsers);
router.route('/login').post(user.logInUser);
router.route('/logout').get(user.logout);
export default router;
