const User = require('../model/User')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')

const userRegister = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const userFound = await User.findOne({ email })
        if (userFound) {
            return res.status(409).json({
                msg: "User already exist"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            username,
            email,
            password: hashedPassword,

        })

        res.status(200).json({ msg: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ msg: "Internal server error" });
    }

}



const userLogin = async (req, res) => {
    const { username, password } = req.body;
    const userFound = await User.findOne({ username });

    if (!userFound) {
        return res.status(404).json({ msg: "User not found" });
    }

    const isPasswordMatched = await bcrypt.compare(password, userFound.password);

    if (!isPasswordMatched) {
        return res.status(409).json({ msg: "Unable to login user, invalid credentials" });
    }

    // Generate token with user ID and username
    ;

    return res.status(200).json({
        msg: "User logged in successfully",
        data: {
            username: userFound.username,
            email: userFound.email,
            token: generateToken(userFound._id, userFound.username)
        }
    });
};


const userDashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    const decoded = req.user; // Get the decoded token object



    return res.status(200).json({
        msg: `Hello user ${decoded.username}`, // Access the username directly from req.user
        secret: `Here is your authorised number, your lucky number is ${luckyNumber}`
    });
};




module.exports = {
    userRegister,
    userLogin,
    userDashboard
}