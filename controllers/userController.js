const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// add user

exports.addUserController = async (req, res) => {
    console.log("Inside addUserController");
    const { username, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("User already exisit.... Please Login")
        }
        else {
            const encryptedPassword = await bcrypt.hash(password, 10)
            const newUser = new users({
                username, email, password, profilePic: encryptedPassword
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// login

exports.loginController = async (req, res) => {
    console.log("Inside LoginController");
    const { email, password } = req.body
    try {
        const existingEmail = await users.findOne({ email })
        if (existingEmail) {
            let isUserPswdMatch = await bcrypt.compare(password, existingEmail.password)
            if (isUserPswdMatch || password == existingEmail.password) {
                const token = jwt.sign({ userId: existingEmail._id }, process.env.JWTPASSWORD)
                res.status(200).json({ user: existingEmail, token })
            } else {
                res.status(404).json("Invalid Email / Password")
            }
        } else {
            res.status(404).json("Invalid Email / Password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

//  edit user
exports.editUserController = async (req, res) => {
    console.log("Inside editUserController");
    const { profilePic } = req.body
    const userId = req.userId
    try {
        const existingUser = await users.findById({ _id: userId })
        existingUser.profilePic = profilePic
        await existingUser.save()
        res.status(200).json(existingUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get all users
exports.getAllUsresController = async (req, res) => {
    console.log("Inside getAllUsresController");
    try {
        const allUsers = await users.find({"role": "User"})
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(401).json(error)
    }
}