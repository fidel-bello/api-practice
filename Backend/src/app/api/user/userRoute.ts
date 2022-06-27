import express from 'express';
import { UserController } from './userController';

const router = express.Router();
const user = new UserController();

router.route('/register').post(user.postUser);
router.route('/user/:id').get(user.getSingleUser);
export default router;
