import mongoose from "mongoose";
import Hotel from "./Hotel.js";

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
        
    },
    phoneNumber:{
        type:String
    },
    about:{
        type:String
    },
    wallet:{
        type:Number
    },
    wishlist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Hotel
    }

})
const Users = mongoose.model('Users',userSchema)
export default Users