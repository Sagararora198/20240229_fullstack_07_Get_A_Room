import mongoose from "mongoose";

import RoomId from "./roomId.js";

const roomSchema = new mongoose.Schema({
    roomNumber:String,
    roomType:{
        type:mongoose.Schema.Types.ObjectId,
        ref:RoomId
    },
    roomDesc:String,
    roomPrice:Number,
    roomPhotos:String


})
const Rooms = mongoose.model('Rooms',roomSchema)
export default Rooms