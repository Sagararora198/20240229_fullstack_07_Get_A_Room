//external dependencies
import validator from "validator";
import mongoose from "mongoose";

//internal dependencies
import Hotel from "./Hotel.js";   
import { emailValidationMessage, roles } from "../dependencies/constants/userConstants.js";
import { emailValidator } from "../dependencies/validations/userValidations.js";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:emailValidator,
            message:emailValidationMessage
        }
            
    },
    role:{
        type:String,
        enum:[roles.USER,roles.ADMIN],
        default:roles.USER
    },
    phoneNumber:{
        type:String,
        required:false
    },
    about:{
        type:String,
        required:false
    },
    wallet:{
        type:Number,
        min:0

    },
    wishlist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Hotel,
        required:false
    }

})
const Users = mongoose.model('Users',userSchema)
export default Users