/* eslint-disable import/no-cycle */
import express from 'express';
import health from '../HealthCheck/healthRoute';
import user from '../user/userRoute';

const router = express.Router();

router.use('/v1', health);
router.use('/v1', user);
// version 2
router.use('/v2', user);
export default router;
