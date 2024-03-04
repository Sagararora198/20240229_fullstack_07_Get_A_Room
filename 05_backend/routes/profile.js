import  express  from "express";
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
import { Router } from "express";
import requireLogin from "../middleware/requireLogin.js";
const profileRouter = express.Router()



// Define the route handler for GET /profile endpoint
profileRouter.get('/profile', requireLogin,(req, res) => {
    // Extract user object from request
    const { user } = req;

    // Check if the user object exists
    if (!user) {
        return res.status(404).json({ error: "User profile not found." });
    }

    // Check if the user is an admin
    if (user.role==='admin') {
        return res.status(200).json({ message: "Profile accessed successfully. (Admin)", user });
    } else {
        return res.status(200).json({ message: "Profile accessed successfully. (Non-admin)", user });
    }
});


profileRouter.post('/profile',requireLogin,(req,res)=>{
    const {user}=req;

    if(!user){
        return res.status(404).send('User not Found')
     }
     
     if (!user.isAdmin) {
        // Update the user's profile
        userser.findByIdAndUpdate(user._id, { about: req.body.about, location: req.body.location, phoneNumber: req.body.phoneNumber }, { new: true })
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
    } else {
        return res.status(403).json({ error: "Access restricted. Only non-admin users are allowed to update their profiles." });
    }
})

export default profileRouter