import { Router } from 'express';
import auth from './auth.js';
import books from './books.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome' });
});

router.use('/auth', auth);
router.use('/books', books);

export default router;