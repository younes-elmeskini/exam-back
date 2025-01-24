const express = require("express");
const { addTask,getTasks,getTaskById,updateTask} = require("../controllers/taskController");
const router = express.Router();
const { isAuthenticated } = require("../utils/Authentication");
const { validation, validationandHandlerrors} = require("../utils/Validation")


router.post("/add",isAuthenticated, validationandHandlerrors,addTask)
router.get("/",isAuthenticated, getTasks)
router.get("/:id",isAuthenticated, validationandHandlerrors,getTaskById)
router.patch("/:id",isAuthenticated, validationandHandlerrors,updateTask)




module.exports = router;