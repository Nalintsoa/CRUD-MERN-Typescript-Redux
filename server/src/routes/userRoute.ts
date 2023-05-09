import { Router } from 'express';
import { signup, login, logout, checkAuth } from '../controllers/userController';
import { requireAuth } from '../middleware/requireAuth';

const router: Router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/check_auth', requireAuth, checkAuth);

export default router;