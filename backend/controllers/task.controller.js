import Task from '../models/Task.js';
import mongoose from 'mongoose';


export const createTask = async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    const userId = req.user._id;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        const newTask = new Task({
            userId,
            title,
            description,
            dueDate,
            priority,
        })
        await newTask.save();
        res.status(201).json({
            message: "Task created successfully",
            task: {
                id: newTask._id,
                title: newTask.title,
                description: newTask.description,
                priority: newTask.priority,
                status: newTask.status,
                dueDate: newTask.dueDate,
                createdAt: newTask.createdAt,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
}

export const getTasks = async (req, res) => {
    try {
        const userId = req.user._id;

        const query = { userId };
        const { status, priority, search } = req.query;

        if (status) query.status = status;
        if (priority) query.priority = priority;

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 });

        res.status(200).json({ tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Error fetching tasks" });
    }
};



export const updateTask = async (req, res) => {
    try {
        const userId = req.user._id;
        const { taskId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        const task = await Task.findOne({ _id: taskId, userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const { title, description, dueDate, priority, status } = req.body;
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (dueDate !== undefined) task.dueDate = dueDate;
        if (priority !== undefined) task.priority = priority;
        if (status !== undefined) task.status = status;
        await task.save();
        res.status(200).json({
            message: "Task updated successfully", task: {
                id: task._id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate,
                createdAt: task.createdAt,
            }
        });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Error updating task", error });

    }

}

export const deleteTask = async (req, res) => {
    const userId = req.user._id;
    const { taskId } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }
        const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Error deleting task" });
    }
}

export const getTaskAnalytics = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ userId });

        const totalTasks = tasks.length;

        const completedTasks = tasks.filter(task => task.status === 'completed').length;
        const pendingTasks = tasks.filter(task => task.status === 'pending').length;
        const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
        const notCompletedTasks = totalTasks - completedTasks;

        const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
        const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium').length;
        const lowPriorityTasks = tasks.filter(task => task.priority === 'low').length;


        let percentageCompleted = 0;
        if (totalTasks > 0) {
            percentageCompleted = (completedTasks / totalTasks) * 100;
            percentageCompleted = Math.round(percentageCompleted);
        }

        const now = new Date();

        const start = new Date(now);
        start.setHours(0, 0, 0, 0);

        const end = new Date(now);
        end.setHours(23, 59, 59, 999);

        const tasksDueToday = tasks.filter(task =>
            task.dueDate &&
            task.dueDate >= start &&
            task.dueDate <= end &&
            task.status !== 'completed'
        ).length;

        const overdueTasks = tasks.filter(task =>
            task.dueDate &&
            task.dueDate < now &&
            task.status !== 'completed'
        ).length;

        res.status(200).json({
            totalTasks,
            completedTasks,
            pendingTasks,
            inProgressTasks,
            notCompletedTasks,
            highPriorityTasks,
            mediumPriorityTasks,
            lowPriorityTasks,
            percentageCompleted,
            tasksDueToday,
            overdueTasks
        });
    } catch (error) {
        console.error("Error fetching task analytics:", error);
        res.status(500).json({ message: "Error fetching task analytics" });
    }
}