const downloadRecipes = require('../models/downloadModel')

// add to downloadRecipe
exports.addToDownloadRecipeController = async (req, res) => {
    console.log("Inside addToDownloadRecipeController");
    const { id } = req.params
    const userId = req.userId
    const { name, image, cuisine } = req.body
    console.log(id, name, image, cuisine, userId);
    try {
        // check recipe already in downloads
        const existingRecipe = await downloadRecipes.findOne({ recipeId: id })
        if (existingRecipe) {
            // increment count of recipe by 1 - update
            existingRecipe.count += 1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }
        else {
            // add recipe to your model - insert
            const newRecipe = new downloadRecipes({
                recipeId: id, recipeName: name, recipeImage: image, recipeCuisine: cuisine, count: 1, userId
            })
            await newRecipe.save()
            res.status(200).json(existingRecipe)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// get user download recipe
exports.getUserDownloadListController = async (req, res) => {
    console.log("Inside getUserDownloadListController");
    // get userid from jwtmiddleware
    const userId = req.userId
    // find documents with userid from model
    try {
        const allUserDownloads = await downloadRecipes.find({ userId })
        res.status(200).json(allUserDownloads)
    } catch (error) {
        res.status(401).json(error)
    }
}

// all download
exports.getAllDownloadListController = async (req, res) => {
    console.log("Inside getUserDownloadListController");
    // find documents with userid from model
    try {
        const allDownloads = await downloadRecipes.find()
        res.status(200).json(allDownloads)
    } catch (error) {
        res.status(401).json(error)
    }
}
