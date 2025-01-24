const express = require("express");
const { addTask} = require("../controllers/taskController");
const router = express.Router();
const { isAuthenticated } = require("../utils/Authentication");
const { validation, validationandHandlerrors} = require("../utils/Validation")


router.post("/add",isAuthenticated, validationandHandlerrors,addTask)


module.exports = router;