//external dependencies 
import express from "express";
import 'dotenv/config';


//internal dependencies
import Hotels from "../models/Hotel.js";
import Rooms from "../models/rooms.js"; // Assuming this is your Room model
import RoomId from "../models/roomId.js";
import requireLogin from "../middleware/requireLogin.js";
import { roles } from "../dependencies/constants/userConstants.js";

const roomRouter = express.Router();

roomRouter.post("/hotel/:hotelId/room", async (req, res) => {
    // Extract hotelId from the URL parameters
    const { hotelId } = req.params;
    const { roomNumber, roomType, roomDesc, roomPrice, roomPhotos } = req.body;

    // Validate required fields
    if (!hotelId || !roomNumber || !roomType || !roomDesc || !roomPrice || !roomPhotos) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    try {
        // Check if the hotel exists
        const hotel = await Hotels.findById(hotelId);
        if (!hotel) {
          return res.status(404).json({ error: "Hotel not found." });
        }
        // console.log(hotel object - ${hotel});
        // Step 2: Extract roomId references from the hotel document
        const roomIds = hotel.rooms.map(room => room._id);
        // console.log(room ids - ${roomIds});
    
        // Step 3: Find room types in the RoomId collection
        const roomTypes = await RoomId.find({ '_id': { $in: roomIds } });
        // console.log(room types ${roomTypes})
        
        const matchingRoomType = roomTypes.find(room => room.roomType === roomType);
        const room = new Rooms({
            roomNumber:roomNumber,
            roomType:matchingRoomType._id,
            roomDesc:roomDesc,
            roomPrice:roomPrice,
            roomPhotos:roomPhotos

        })

        await room.save()
        res.status(201).json({ message: "Room added successfully", room });

        // const rooms = await Promise.all(roomTypes.map(async (roomType) => {
        //     return await Rooms.find({ roomType: roomType._id });
        //   }));
    

        // Create a new Room document
        // const room = new Rooms({
        //     roomNumber,
        //     roomType: roomId._id, // Reference the newly created RoomId document
        //     roomDesc,
        //     roomPrice,
        //     roomPhotos
        // });
        // await room.save();

        // res.status(201).json({ message: "Room added successfully", room });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default roomRouter;