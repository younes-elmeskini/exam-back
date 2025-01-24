const express = require("express");
const { addCategory, getCategories,getDeletedCaretegories, getCategoryById, updateCategory, deleteCategory} = require("../controllers/categoryController");
const router = express.Router();
const { isAuthenticated } = require("../utils/Authentication");
const { validation, validationandHandlerrors} = require("../utils/Validation")

router.post("/add",validation.validateName,isAuthenticated, validationandHandlerrors,addCategory)
router.get("/",isAuthenticated, validationandHandlerrors,getCategories)
router.get("/deleted",isAuthenticated, validationandHandlerrors,getDeletedCaretegories)
router.get("/:id",isAuthenticated, validationandHandlerrors,getCategoryById)
router.patch("/:id",isAuthenticated, validationandHandlerrors,updateCategory)
router.delete("/:id",isAuthenticated, validationandHandlerrors,deleteCategory)


module.exports = router;