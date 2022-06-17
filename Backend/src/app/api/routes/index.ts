import express from 'express';

import health from '../HealthCheck/healthRoute';
import user from '../user/userRoute';

const router = express.Router();

router.use('/v1', health);
router.use('/v1', user);

export default router;
