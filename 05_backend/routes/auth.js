//external dependencies
import  express  from "express";
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const authRouter = express.Router()
//internal dependencies
import Users from "../models/User.js";
import { emailValidator, passwordValidator, usernameValidator } from "../dependencies/validations/userValidations.js";

/**signup route
 * 
 */
authRouter.post('/signup', async (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const username = req.body.username;

    if (!emailValidator(email) || !passwordValidator(password) || !usernameValidator(username)) {
        return res.status(422).json({ error: "please enter all fields correctly" });
    }

    try {
        const savedUser = await Users.findOne({ email: email });

        if (savedUser) {
            return res.status(422).json({ error: `user with email - ${email} already exists` });
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new Users({
            name: username,
            email: email,
            password: hashedPassword,
        });

        await user.save();
        res.json({ message: "saved successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


/**Sign in route
 * 
 */
authRouter.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // if username and password not given
    if (!passwordValidator(password) || !emailValidator(username)) {
        return res.status(422).json({ error: "please enter all fields" });
    }

    try {
        // Check if the user exists
        const savedUser = await Users.findOne({ email: email });
        if (!savedUser) {
            return res.status(422).json({ error: "invalid user" });
        }

        // Compare the input password with the hashed password
        console.log(savedUser.password);
        const passwordMatch = await bcrypt.compare(password, savedUser.password);

        if (passwordMatch) {
            const token = jwt.sign({ _id: savedUser._id, role: savedUser.role }, process.env.SECRET_KEY);
            res.send(token);
        } else {
            return res.status(422).json({ error: "invalid password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default authRouter