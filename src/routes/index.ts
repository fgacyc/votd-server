import express from 'express';
import verse from './verse';

const router = express.Router();

router.use('/verse', verse);

export default router;
