import  express  from "express";
import 'dotenv/config'
import Users from "../models/User.js";
const profileRouter = express.Router()

//middleware 
import requireLogin from "../middleware/requireLogin.js";
//roles of different users
import { roles } from "../dependencies/constants/userConstants.js";

// Define the route handler for GET /profile endpoint
profileRouter.get('/profile', requireLogin,(req, res) => {
    // Extract user object from request
    const { user } = req;
    //to check the available roles 
    const availableRoles = Object.values(roles)
    
    // Check if the user object exists
    if(!availableRoles.includes(user.role)){    
        return res.status(404).json({ error: "User profile not found." });
    }

    // Check if the user is an admin
    if (user.role===roles.ADMIN) {
        return res.status(200).json({ message: "Profile accessed successfully by Admin", user });
    } else {
        return res.status(200).json({ message: "Profile accessed successfully by Non-admin", user });
    }
});


profileRouter.post('/profileUpdate',requireLogin,(req,res)=>{
    const {user}=req.user;
    if(!user){
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