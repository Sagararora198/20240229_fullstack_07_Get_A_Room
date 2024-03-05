import mongoose from "mongoose";
import Hotel from "./Hotel.js";

const roomIdSchema = new mongoose.Schema({

    roomType:String

})
const RoomId = mongoose.model('RoomId',roomIdSchema)
export default RoomId

