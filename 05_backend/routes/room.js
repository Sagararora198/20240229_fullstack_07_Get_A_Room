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

/**
 * @swagger
 * /room/hotel/{hotelId}/room:
 *  post:
 *    summary: Add a room to a hotel
 *    description: Add a new room to the specified hotel.
 *    tags: [Hotel]
 *    parameters:
 *      - in: path
 *        name: hotelId
 *        description: The ID of the hotel to add the room to.
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: room
 *        description: The room object to add.
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - roomNumber
 *            - roomType
 *            - roomDesc
 *            - roomPrice
 *            - roomPhotos
 *          properties:
 *            roomNumber:
 *              type: string
 *              description: The room number.
 *            roomType:
 *              type: string
 *              description: The type of the room.
 *            roomDesc:
 *              type: string
 *              description: The description of the room.
 *            roomPrice:
 *              type: number
 *              description: The price of the room.
 *            roomPhotos:
 *              type: array
 *              description: An array of photo URLs for the room.
 *              items:
 *                type: string
 *    responses:
 *      201:
 *        description: Room added successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message.
 *                  example: "Room added successfully"
 *                room:
 *                  $ref: '#/components/schemas/Room'
 *      400:
 *        description: Bad Request. Missing required fields.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating missing required fields.
 *                  example: "Missing required fields."
 *      404:
 *        description: Not Found. Hotel not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating hotel not found.
 *                  example: "Hotel not found."
 *      500:
 *        description: Internal Server Error. Something went wrong on the server.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message explaining the reason for the server error.
 *                  example: "Internal Server Error"
 */
roomRouter.post("/hotel/:hotelId/room", requireLogin, async (req, res) => {
    // Extract hotelId from the URL parameters
    const { hotelId } = req.params;
    const { roomNumber, roomType, roomDesc, roomPrice, roomPhotos } = req.body;

    // Check if the user role is Admin
    const { user } = req;
    if (!user) {
        return res.status(401).json({ error: "JWT token is missing." });
    }
    if (user.role !== roles.ADMIN) {
        return res.status(403).json({ error: "Access forbidden. Admin access required." });
    }


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
            roomNumber: roomNumber,
            roomType: matchingRoomType._id, //_id{removed} if need add in future
            roomDesc: roomDesc,
            roomPrice: roomPrice,
            roomPhotos: roomPhotos

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
    

//search by roomId

roomRouter.get('/room/:roomId', async (req, res) => {
    const { roomId } = req.params;

    try {
        // Find the room by room ID
        const room = await RoomId.findById(roomId);
        if (!room) {
            return res.status(404).json({ error: "Room not found." });
        }

        // If the room is found, send it as a response
        res.json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//search by roomType single

// roomRouter.get('/rooms/by-type/:roomTypeId', async (req, res) => {
//     const { roomTypeId } = req.params;

//     console.log("id"+req.params.roomTypeId);

//     try {
//         // Find rooms by room type ID
//         const rooms = await Rooms.find({ roomType: roomTypeId });
//         if (!rooms || rooms.length === 0) {
//             return res.status(404).json({ error: "Rooms not found for the given room type ID." });
//         }

//         // If rooms are found, send them as a response
//         res.json(rooms);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });


//search by roomtype multiple

roomRouter.get('/rooms/by-types', async (req, res) => {
    const { roomTypeIds } = req.query;

    // console.log("room type1:" + typeof (roomTypeIds));

    try {
        // Convert roomTypeIds to an array
        const roomTypeIdsArray = roomTypeIds.split(',');

        // console.log("room type2:" + typeof (roomTypeIdsArray));

        // Find rooms by room type IDs
        const rooms = await Rooms.find({ roomType: { $in: roomTypeIdsArray } });

        // If no rooms are found, return an empty array
        if (!rooms || rooms.length === 0) {
            return res.status(201).json({ error: "No rooms found for the provided room type IDs." });
        }

        // If rooms are found, send them as a response
        res.json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});




export default roomRouter;