import { Router } from 'express';
import * as controller from '../controllers/auth.js';
import auth from '../middlewares/authorization.js';

const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/profile', auth, controller.profile);

export default router;