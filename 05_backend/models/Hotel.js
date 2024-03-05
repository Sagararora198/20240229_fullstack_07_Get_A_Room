import mongoose from "mongoose";
import RoomId from "./roomId.js";

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
    rating:{
        type:Number,
        required:false,
        min:0,
        max:5
    }

})
const Hotel = mongoose.model('Hotels',hotelSchema)
export default Hotel