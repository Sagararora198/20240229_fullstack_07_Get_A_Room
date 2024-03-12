// Importing external dependencies
import express from "express";
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Importing internal dependencies (Model, Validators)
import Users from "../models/User.js";
import { emailValidator, passwordValidator, usernameValidator } from "../dependencies/validations/userValidations.js";
import signupValidation from "../dependencies/validations/signupValidation.js";

// Creating an Express Router
const authRouter = express.Router();

// Route for user registration (Signup)

/**
 * @swagger
 * /signup:
 *  post:
 *   
 *      summary: Signs up a new user
 *      description: Creates a new user account with a username, email, and password. Returns a success message if the account is created successfully.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - email
 *                          - password
 *                      properties:
 *                          username:
 *                              type: string
 *                              description: The user's chosen username.
 *                              example: "newUser123"
 *                          email:
 *                              type: string
 *                              description: The user's email address.
 *                              example: "user@example.com"
 *                          password:
 *                              type: string
 *                              description: The user's chosen password.
 *                              example: "password123"
 *      responses:
 *          200:
 *              description: User created successfully. Returns a success message.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Success message.
 *                                  example: "saved successfully"
 *          400:
 *              description: Bad Request. Validation failed for the provided user data.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: Error message explaining the reason for the validation failure.
 *                                  example: "Validation error message"
 *          422:
 *              description: Unprocessable Entity. The email is already in use.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: Error message explaining that the email is already in use.
 *                                  example: "User with email - user@example.com already exists"
 *          500:
 *              description: Internal Server Error. Something went wrong on the server.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: Error message explaining the reason for the server error.
 *                                  example: "Internal Server Error"
 */

authRouter.post('/signup', async (req, res) => {
    try {
        // Extracting user data from request body
        const { password, email, username } = req.body;
        const userData = { password, email, username };

        // Validating user input
        const validations = signupValidation(userData);
        if (validations.error) {
            return res.status(400).json(validations);
        }

        // Checking if the email already exists
        const existingUser = await Users.findOne({ email: email });
        if (existingUser) {
            return res.status(422).json({ error: `User with email ${email} already exists` });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating a new user
        const newUser = new Users({
            name: username,
            email: email,
            password: hashedPassword,
        });

        // Saving the new user to the database
        await newUser.save();
        return res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route for user login (Signin)

/**
 * @swagger
 * /signin:
 *  post:
 *      summary: Signs in a user
 *      description: Authenticates a user by their email and password, and returns a token if successful.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: The user's email address.
 *                              example: "user@example.com"
 *                          password:
 *                              type: string
 *                              description: The user's password.
 *                              example: "password123"
 *      responses:
 *          200:
 *              description: Successfully authenticated. Returns a token.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
 *                                  description: Authentication token.
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0NTY3ODkwIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *          422:
 *              description: Unprocessable Entity. Either email or password validation failed, or the user does not exist, or the password is incorrect.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: Error message explaining the reason for the failure.
 *                                  example: "please enter all fields"
 *          500:
 *              description: Internal Server Error. Something went wrong on the server.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: Error message explaining the reason for the server error.
 *                                  example: "Internal Server Error"
 */

authRouter.post('/signin', async (req, res) => {
    try {
        // Extracting email and password from request body
        const { email, password } = req.body;

        // Validating email and password
        if (!passwordValidator(password) || !emailValidator(email)) {
            return res.status(422).json({ error: "Please provide valid email and password" });
        }

        // Finding the user by email
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.status(422).json({ error: "Invalid email or password" });
        }

        // Comparing the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            // Generating JWT token
            const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY);
            return res.json({ token });
        } else {
            return res.status(422).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Exporting the router
export default authRouter;
