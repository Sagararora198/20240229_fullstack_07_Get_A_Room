import express from "express";
import 'dotenv/config'
import Users from "../models/User.js";
const profileRouter = express.Router()

//middleware    
import requireLogin from "../middleware/requireLogin.js";
//roles of different users  
import { roles } from "../dependencies/constants/userConstants.js";

// Define the route handler for GET /profile endpoint

/**
 * @swagger
 * /profile:
 *  get:
 *    summary: Get user profile
 *    description: Retrieve the profile of the currently logged-in user.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: User profile retrieved successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message.
 *                user:
 *                  type: object
 *                  description: User profile data.
 *      '401':
 *        description: Unauthorized. User must be logged in.
 *      '404':
 *        description: User profile not found.
 */

profileRouter.get('/profile', requireLogin, async (req, res) => {
    // Extract user object from request
    const { user } = req;
    //to check the available roles 
    const availableRoles = Object.values(roles)

    // Check if the user object exists
    if (!availableRoles.includes(user.role)) {
        return res.status(404).json({ error: "User profile not found." });
    }

    // Check if the user is an admin
    if (user.role === roles.ADMIN) {
        const userdata = await Users.findById(user._id);
        console.log("User Data:" + userdata);
        return res.status(200).json({ message: "Profile accessed successfully by Admin", userdata });
    } else {
        const userdata = await Users.findById(user._id);
        console.log("User Data:" + userdata);
        return res.status(200).json({ message: "Profile accessed successfully by Non-admin", userdata });
    }
});

/**
 * @swagger
 * /profileUpdate:
 *  post:
 *    summary: Update user profile
 *    description: Update the profile information of the currently logged-in user.
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              about:
 *                type: string
 *                description: About information of the user.
 *              location:
 *                type: string
 *                description: Location information of the user.
 *              phoneNumber:
 *                type: number
 *                description: Phone number of the user.
 *    responses:
 *      '200':
 *        description: User profile updated successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message.
 *                user:
 *                  type: object
 *                  description: Updated user profile data.
 *      '401':
 *        description: Unauthorized. User must be logged in.
 *      '404':
 *        description: User profile not found.
 *      '500':
 *        description: Internal Server Error. Something went wrong on the server.
 */
profileRouter.post('/profileUpdate', requireLogin, (req, res) => {
    const { user } = req;
    if (!user) {
        return res.status(404).send('User not Found')
    }

    // Update the user's profile
    Users.findByIdAndUpdate(user._id, { about: req.body.about, location: req.body.location, phoneNumber: req.body.phoneNumber }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ error: "User profile not found." });
            }
            return res.status(200).json({ message: "Profile updated successfully.", user: updatedUser });
        })
        .catch(error => {
            console.error("Error updating user profile:", error);
            return res.status(500).json({ error: "Internal Server Error. Please try again later." });
        });

})



export default profileRouter