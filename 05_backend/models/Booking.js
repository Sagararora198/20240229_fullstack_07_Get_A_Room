import mongoose from "mongoose";
import Users from "./User.js";
import Rooms from "./rooms.js";

const bookingSchema = new mongoose.Schema({
    bookingDate:Date,
    bookedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Users
    },
    bookedRoom:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Rooms
    },
    checkinDate:Date,
    checkoutDate:Date,
    paymentDetails:String
})

const Bookings = mongoose.model('Bookings',bookingSchema)
export default Bookings