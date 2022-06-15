import express from 'express';
import { healthCheck } from './heatlhController';

const router = express.Router();

router.route('/healthCheck').get(healthCheck);

export default router;
