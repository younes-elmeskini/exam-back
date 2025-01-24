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


module.exports = {
    addTask,
};
