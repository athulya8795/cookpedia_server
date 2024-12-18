const recipes = require('../models/recipeModel')

// get all recipes
exports.getAllRecipeController = async (req, res) => {
    console.log("Inside getAllRecipeController");
    try {
        const allRecipe = await recipes.find()
        res.status(200).json(allRecipe)
    } catch (error) {
        res.status(401).json(err)
    }
}

// getRecipe
exports.getRecipeController = async (req, res) => {
    console.log("Inside getRecipeController");
    // get dynamic values from url
    const { id } = req.params
    try {
        const recipeDetails = await recipes.findById({ _id: id })
        res.status(200).json(recipeDetails)
    } catch (error) {
        res.status(401).json(error)
    }
}

// related recipe
exports.relatedRecipeController = async (req, res) => {
    console.log("Inside relatedRecipeController");
    const cuisine = req.query.cuisine
    try {
        const allRelatedRecipes = await recipes.find({ cuisine })
        res.status(200).json(allRelatedRecipes)
    } catch (error) {
        res.status(401).json(error)
    }
}

// add Recipe
exports.addRecipeController = async (req, res) => {
    console.log("Inside addRecipeController");
    // get all recipe from body
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType } = req.body
    try {
        // check recipe already in model
        const existingRecipe = await recipes.findOne({ name })
        if (existingRecipe) {
            // else recipe already exist
            res.status(406).json("Recipe already exist in our collection!!! Add Another...")
        }
        else {
            // if recipe not in model then insert the recipe
            const newRecipe = new recipes({
                name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// update recipe
exports.updateRecipeController = async (req, res) => {
    console.log("Inside updateRecipeController");
    // get id of recipe should be updated
    const { id } = req.params
    // get update recipe details from req.body
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType } = req.body
    // find recipe name is already exist
    try {
        const updateRecipe = await recipes.findByIdAndUpdate({ _id: id }, {
            name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType
        }, { new: true })
        await updateRecipe.save()
        res.status(200).json(updateRecipe)
    } catch (error) {
        res.status(401).json(error)
    }
}

// delete Recipe
exports.removeRecipeController = async (req, res) => {
    console.log("Inside removeRecipeController");
    // get recipe id
    const { id } = req.params
    // remove recipe from model - findbyidanddelete
    try {
        const removeRecipe = await recipes.findByIdAndDelete({ _id: id })
        res.status(200).json(removeRecipe)
    } catch (error) {
        res.status(401).json(error)
    }
}