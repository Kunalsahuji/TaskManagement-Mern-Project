const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

exports.registerUser = async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required!" })
        }

        const userExists = await User.findOne({ email })
        if (userExists) return res.status(400).json({ message: "User already registered with this email address!" })
        // 
        const user = await User.create({
            name, email, password
        })
        const token = generateToken(user._id) 
        res.status(201).json({
            message: "User Registered!", token: token, user: {
                id: user._id, name, email
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "server error", statusCode: res.statusCode,
            error: error.message
        })
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) return res.status(400).json({ message: "Email and Password are required!" })

        const user = await User.findOne({ email })
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                message: 'Invalid Credentials!'
            })
        }
        const token = generateToken(user._id)
        res.status(200).json({
            message: "User login!",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: email
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "server error!",
            statusCode: res.statusCode,
            error: error.message
        })
    }
}


module.exports.userLogout = async (req, res, next) => {
    try {
        const { email, username } = req.body
        const user = await User.findOne({ email })
        res.status(200).json({ message: `${user.username} Logout` })

    } catch (error) {
        res.status(500).json({
            message: "server error!",
            statusCode: res.statusCode,
            error: error.message
        })
    }
}