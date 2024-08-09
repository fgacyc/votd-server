import express from 'express';
import votd from './votd';

const router = express.Router();

router.use('/', votd);

export default router;
