import mongoose from "mongoose";
import Users from "./User.js";
import Hotel from "./Hotel.js";

const reviewsSchema = new mongoose.Schema({
    reviewedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Users
    },
    reviewedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Hotel
    },
    review:
    {
        type:String,
        required:false,
        minLength:5
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5
    }

})
const Reviews = mongoose.model('Reviews',reviewsSchema)
export default Reviews