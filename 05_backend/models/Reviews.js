import mongoose from "mongoose";
import Users from "./User.js";
import Rooms from "./rooms.js";

const reviewsSchema = new mongoose.Schema({
    reviewedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Users
    },
    reviewedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Rooms
    },
    review:String,
    ratings:String

})
const Reviews = mongoose.model('Reviews',reviewsSchema)
export default Reviews