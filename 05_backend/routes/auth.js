//external dependencies
import  express  from "express";
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const authRouter = express.Router()
//To create Swagger UI page for your API's

//internal dependencies(Model,Validators)
import Users from "../models/User.js";
import { emailValidator, passwordValidator, usernameValidator } from "../dependencies/validations/userValidations.js";
import signupValidation from "../dependencies/validations/signupValidation.js";


authRouter.post('/signup', async (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const username = req.body.username;
    const userdata = {password,email,username}

    //validation of the user if correct password,email and username is typed 
    const validations = signupValidation(userdata)
    if(validations.error){
        return res.status(400).json(validations)
    }
    
    try {
        const savedUser = await Users.findOne({ email: email });
        
        //If the email is already present
        if (savedUser) {
            return res.status(422).json({ error: `user with email - ${email} already exists` });
        }
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // creating the new user with username,email and hashed password
        const user = new Users({
            name: username,
            email: email,
            password: hashedPassword,
        });
        //save new user details
        await user.save();
        res.json({ message: "saved successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Signin or login of the user or admin
authRouter.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // if username and password not given
    if (!passwordValidator(password) || !emailValidator(email)) {
        return res.status(422).json({ error: "please enter all fields" });
    }
    console.log(email);
    try {
        // Check if the user exists
        const savedUser = await Users.findOne({ email: email });
        console.log(savedUser);
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