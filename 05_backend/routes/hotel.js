//external dependencies 
import express from "express";
import 'dotenv/config';


//internal dependencies
import Hotels from "../models/Hotel.js";
import Rooms from "../models/rooms.js"; // Assuming this is your Room model
import RoomId from "../models/roomId.js";
import requireLogin from "../middleware/requireLogin.js";
import { roles } from "../dependencies/constants/userConstants.js";

const hotelRouter = express.Router();

// Middleware to verify if the user is an admin
// const verifyAdmin = (req, res, next) => {
//     const { authorization } = req.headers;
//     if (!authorization) {
//         return res.status(401).json({ error: "JWT token is missing." });
//     }
//     const token = authorization.replace("Bearer ", "");
//     jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
//         if (err) {
//             return res.status(401).json({ error: "Invalid JWT token." });
//         }
//         // Assuming the payload contains isAdmin property
//         if (!payload.isAdmin) {
//             return res.status(403).json({ error: "Access forbidden. Admin access required." });
//         }
//         req.user = payload; // Add user payload to request
//         next();
//     });
// };

// API to update hotel properties by admin

hotelRouter.put('/hotel/:hotelId', requireLogin, async (req, res) => {
    const { hotelId } = req.params;
    const { hotelName, hotelVisibility, hotelPhotos, hotelPhoneNumber, hotelLocation, hotelAmenities } = req.body;
    //checking if user is admin
    if (!hotelId) {
        return res.status(400).json({ error: "hotelId is missing." });
    }
    const { user } = req
    if (user.role == roles.USER) {
        return res.status(403).json({ error: "Unauthorized user" })
    }
    else if (user.role == roles.ADMIN) {


        try {
            const hotel = await Hotels.findById(hotelId);
            if (!hotel) {
                return res.status(404).json({ error: "Hotel not found." });
            }

            // Update hotel properties if provided
            if (hotelName) hotel.hotelName = hotelName;
            if (hotelVisibility !== undefined) hotel.visibility = hotelVisibility;
            if (hotelPhotos) hotel.hotelPhotos = hotelPhotos;
            if (hotelPhoneNumber) hotel.phoneNumber = hotelPhoneNumber;
            if (hotelLocation) hotel.hotelAddress = hotelLocation;
            if (hotelAmenities) hotel.hotelAmenities = hotelAmenities;

            await hotel.save();
            res.json({ message: "Hotel updated successfully", hotel });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
});

//API to post hotel by admin 
hotelRouter.post('/hotel', requireLogin, async (req, res) => {
    const { hotelName, hotelAddress, roomTypes } = req.body; // Assuming roomTypes is an array of strings
    //checking if user is admin
    if (user.role == roles.USER) {
        return res.status(403).json({ error: "Unauthorized user" })
    }
    else if (user.role == roles.ADMIN) {
        try {
            // Process each room type
            const roomIds = await Promise.all(roomTypes.map(async (type) => {
                const room = new RoomId({ roomType: type });
                await room.save();
                return room._id; // Collect the ID of the newly created RoomId document
            }));

            // Create a new hotel with references to the created RoomId documents
            const hotel = new Hotels({
                hotelName,
                hotelAddress,
                rooms: roomIds// Map each roomId to the expected format
            });

            await hotel.save();

            res.status(201).json({ message: "Hotel added successfully", hotel });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
});

//API to delete hotel by admin
/*
! NOT YET COMPLETE  
*/
hotelRouter.delete('/hotel/:hotelId', requireLogin, async (req, res) => {
    // Extract the hotelId from the request parameters
    const { hotelId } = req.params;

    // Check if the user role is Admin
    const { user } = req;
    if (!user) {
        return res.status(401).json({ error: "JWT token is missing." });
    }
    if (user.role !== roles.ADMIN) {
        return res.status(403).json({ error: "Access forbidden. Admin access required." });
    }

    // Check if hotelId is provided
    if (!hotelId) {
        return res.status(400).json({ error: "hotelId is missing." });
    }

    try {
        // Find the hotel by ID
        const hotel = await Hotels.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ error: "Hotel not found." });
        }

        // Delete associated rooms from Room.js
        await Rooms.deleteMany({ roomType: RoomId });

        // Delete associated room IDs from RoomId.js
        await RoomId.deleteMany({ hotel: hotelId });

        // Delete the hotel itself
        await hotel.remove();

        res.json({ message: "Hotel and associated rooms deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})
export default hotelRouter;