const express = require('express')
const recipeController = require('../controllers/recipeController')
const testimonyController = require('../controllers/testimonyController')
const userController = require('../controllers/userController')
const downloadRecipeController = require('../controllers/downloadRecipeController')
const saveRecipeController = require('../controllers/saveRecipeController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const router = new express.Router()

// all recipes
router.get("/all-recipes", recipeController.getAllRecipeController)

// add testimony
router.post("/add-testimony", testimonyController.addTestimonyContoller)

// add-user
router.post("/register", userController.addUserController)

// login
router.post("/login", userController.loginController)

// view single recipes
router.get("/recipe/:id/view", jwtMiddleware, recipeController.getRecipeController)

// related recipes
router.get("/related-recipe", jwtMiddleware, recipeController.relatedRecipeController)

// download recipes
router.post("/recipe/:id/download", jwtMiddleware, downloadRecipeController.addToDownloadRecipeController)

// save recipe
router.post("/recipe/:id/save", jwtMiddleware, saveRecipeController.addToSaveRecipeController)

// get user saved recipe
router.get("/get-save-recipes", jwtMiddleware, saveRecipeController.getUserSavedRecipeController)

// delete user saved recipe
router.delete("/save-recipes/:id/remove", jwtMiddleware, saveRecipeController.removeSaveRecipeController)

// get user download recipes
router.get("/user-downloads", jwtMiddleware, downloadRecipeController.getUserDownloadListController)

// edit user
router.post("/user/edit", jwtMiddleware, userController.editUserController)

// all user
router.get("/all-user", jwtMiddleware, userController.getAllUsresController)

// all-downloads
router.get("/all-download", jwtMiddleware, downloadRecipeController.getAllDownloadListController)

// get-testimony
router.get("/all-feedback", jwtMiddleware, testimonyController.getAllFeedbackController)

// update testimony
router.get("/feedback/:id/update", jwtMiddleware, testimonyController.updateFeedbackStatusController)

// get-approved-testimony
router.get("/all-approve-feedback", testimonyController.getAllApprovedFeedbackController)

// add recipe 
router.post("/add-recipe",jwtMiddleware,recipeController.addRecipeController)

// edit recipe
router.put("/recipe/:id/edit",jwtMiddleware,recipeController.updateRecipeController)

// delte recipe
router.delete("/recipe/:id/remove",jwtMiddleware,recipeController.removeRecipeController)

module.exports = router