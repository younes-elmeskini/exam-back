const prisma = require("../utils/client");


const addTask = async (req, res) => {
    try {
        const { name , description, categoryId } = req.body;
        const task = await prisma.task.create({
            data: {
                name,
                description,
                categoryId,
                userId: req.user.userId,
            },
        });
        res.status(201).json({ message: 'Task added successfully', data: task });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add task', error: error.message });
    }
};
const getTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                userId: req.user.userId,
            },
        });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = await prisma.task.findUnique({
            where: {
                id: id,
            },
        });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task' });
    }
};

const updateTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        const updates = req.body;
        await prisma.task.update({ where: { id }, data: updates });
        const updatedTask = await prisma.task.findUnique({ where: { id } });
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur',error:err.message });
    }
};




module.exports = {
    addTask,
};
