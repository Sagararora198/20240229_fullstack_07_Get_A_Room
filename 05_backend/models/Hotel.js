import mongoose from "mongoose";
import RoomId from "./roomId.js";
import Users from "./User.js";

const hotelSchema = new mongoose.Schema({
    hotelName:{
        type:String,
        required:true
    },
    hotelAddress:{
        type:String,
        required:true

    },
    visibility:{
        type:Boolean,
        default:true

    },
    phoneNumber:{
        type:Number,
    },
    rooms:[
        {
            room_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:RoomId
            }
            
        }
    ],
    hotelPhotos:{
        type:String
    },
    hotelAmenities:{
        type:String
    },
<<<<<<< HEAD
    rating:{
        type:Number,
        required:false,
        min:0,
        max:5
=======
    managedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Users
>>>>>>> a21ba2adec897eb1c5e3a0b125ee5d052c251abd
    }
})

const Hotel = mongoose.model('Hotels',hotelSchema)
export default Hotel