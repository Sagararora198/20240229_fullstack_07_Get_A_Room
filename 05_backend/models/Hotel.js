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

    },
    phoneNumber:{
        type:Number
    },
    rooms:[
        {
            room_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:RoomId
            }
            
        }
    ],
    hotelPhotos:String,
    hotelAmenities:String

})
const Hotel = mongoose.model('Hotels',hotelSchema)
export default Hotel