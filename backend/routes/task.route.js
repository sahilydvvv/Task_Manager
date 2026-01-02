import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { createTask, getTasks, updateTask, deleteTask,getTaskAnalytics} from '../controllers/task.controller.js';
const router = express.Router();


// task routes

router.post('/createTask',authenticateToken, createTask);

router.get('/getTasks', authenticateToken, getTasks);

router.patch('/updateTask/:taskId',authenticateToken, updateTask);

router.delete('/deleteTask/:taskId', authenticateToken, deleteTask);

router.get('/analytics', authenticateToken, getTaskAnalytics);

export default router;