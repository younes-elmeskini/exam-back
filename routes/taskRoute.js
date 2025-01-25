const express = require("express");
const { addTask,getTasks,getTaskById,getDeletedTasks,updateTask,deleteTask,restoreTask} = require("../controllers/taskController");
const router = express.Router();
const { isAuthenticated } = require("../utils/Authentication");
const { validation, validationandHandlerrors} = require("../utils/Validation")


router.post("/add",isAuthenticated, validationandHandlerrors,addTask)
router.get("/",isAuthenticated, getTasks)
router.get("/deleted",isAuthenticated, validationandHandlerrors,getDeletedTasks)
router.get("/:id",isAuthenticated, validationandHandlerrors,getTaskById)
router.patch("/:id",isAuthenticated, validationandHandlerrors,updateTask)
router.patch("/restore/:id",isAuthenticated, validationandHandlerrors,restoreTask)
router.delete("/:id",isAuthenticated, validationandHandlerrors,deleteTask)



module.exports = router;