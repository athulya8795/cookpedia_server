const testimonials = require("../models/testimonyModel")

// add testimony
exports.addTestimonyContoller = async (req, res) => {
    console.log("Inside addTestimonyController");
    const { name, email, message } = req.body

    try {
        const newTestimony = new testimonials({
            name, email, message
        })
        await newTestimony.save()
        res.status(200).json(newTestimony)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get all feedback
exports.getAllFeedbackController = async (req, res) => {
    console.log("Indide getAllFeedbackController");
    try {
        allFeedback = await testimonials.find()
        res.status(200).json(allFeedback)
    } catch (error) {
        res.status(401).json(error)
    }
}

// feedback status update
exports.updateFeedbackStatusController = async(req,res)=>{
    console.log("Inside updateFeedbackStatusController");
    // get feedback id from url paramenter
    const {id} = req.params
    // get status of feedback from url query
    const status = req.query.status
    // update status of feedback with given id
    try {
        const existingFeedback = await testimonials.findById({_id:id})
        existingFeedback.status = status
        await existingFeedback.save()
        res.status(200).json(existingFeedback)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get all approved feedback - guest user
exports.getAllApprovedFeedbackController = async (req,res)=>{
    console.log("Inside getAllApprovedFeedbackController");
    try {
        allApprovedFeedback = await testimonials.find({status:"Approved"})
        res.status(200).json(allApprovedFeedback)
    } catch (error) {
        res.status(401).json(error)
    }
}