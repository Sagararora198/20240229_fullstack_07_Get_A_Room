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
    review:String,
    rating:{
        type:Number,
        required:false,
        min:0,
        max:5
    }

})
const Reviews = mongoose.model('Reviews',reviewsSchema)
export default Reviews