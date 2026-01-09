import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticateToken, (req, res) => {
    res.json({
        authenticated: true,
        user: req.user
    });
});

export default router;