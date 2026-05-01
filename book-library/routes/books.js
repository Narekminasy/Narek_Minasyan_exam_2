import { Router } from 'express';
import * as controller from '../controllers/books.js';
import auth from '../middlewares/authorization.js';

const router = Router();

router.get('/', auth, controller.getAll);
router.post('/', auth, controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

export default router;