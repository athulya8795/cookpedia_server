const saveRecipe = require('../models/saveRecipeModel')

// add to collection
exports.addToSaveRecipeController = async (req, res) => {
    console.log("inside addToSaveRecipeController");
    const { id } = req.params
    const userId = req.userId
    const { name, image } = req.body

    try {
        const existingRecipe = await saveRecipe.findOne({ recipeId: id })
        if (existingRecipe) {
            res.status(406).json("Selected Recipenalready in your collection..Please add another!!!")
        }
        else {
            const newRecipe = new saveRecipe({
                recipeId: id, name, image, userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// user recipe collection get - authorized user
exports.getUserSavedRecipeController = async (req, res) => {
    console.log("Inside getUserSavedRecipeController");
    // get userId to get recipe collection
    const userId = req.userId
    try {
        const userRecipeCollection = await saveRecipe.find({ userId })
        res.status(200).json(userRecipeCollection)
    } catch (error) {
        res.status(401).json(error)
    }
}

// remove save recipe 
exports.removeSaveRecipeController = async(req,res)=>{
    console.log("Inside removeSaveRecipeController");
    // 1. get item _id to be removed from req params
    const {id} = req.params
    // 2. remove item from collection using findByIdandDelete
    try {
        const removeSaveRecipe = await saveRecipe.findByIdAndDelete({_id:id})
        res.status(200).json(removeSaveRecipe)
    } catch (error) {
        res.status(401).json(error)
    }
}