import express from 'express';

import health from '../HealthCheck/healthRoute';
const router = express.Router();

router.use('/v1', health);

export default router;