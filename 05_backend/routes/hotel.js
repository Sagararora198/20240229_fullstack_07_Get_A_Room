//external dependencies 
import express from "express";
import 'dotenv/config';


//internal dependencies
import Hotels from "../models/Hotel.js";
import Rooms from "../models/rooms.js"; // Assuming this is your Room model
import RoomId from "../models/roomId.js";
import requireLogin from "../middleware/requireLogin.js";
import { roles } from "../dependencies/constants/userConstants.js";
import Hotel from "../models/Hotel.js";

const hotelRouter = express.Router();


// API to update hotel properties by admin
/**
 * @swagger
 * /hotels/{hotelId}:
 *   put:
 *     summary: Updates hotel properties by admin
 *     tags: [Hotel]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         schema:
 *           type: string
 *         description: The hotel ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelName:
 *                 type: string
 *                 description: Name of the hotel
 *               hotelVisibility:
 *                 type: boolean
 *                 description: Visibility status of the hotel
 *               hotelPhotos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URLs of hotel photos
 *               hotelPhoneNumber:
 *                 type: string
 *                 description: Contact phone number for the hotel
 *               hotelLocation:
 *                 type: string
 *                 description: Physical location of the hotel
 *               hotelAmenities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of amenities available at the hotel
 *     responses:
 *       200:
 *         description: Hotel updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 hotel:
 *                   $ref: '#/components/schemas/Hotel'
 *       400:
 *         description: hotelId is missing
 *       403:
 *         description: Unauthorized user
 *       404:
 *         description: Hotel not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */
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
/**
 * @swagger
 * /hotels:
 *   post:
 *     summary: Adds a new hotel by admin
 *     tags: [Hotel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelName:
 *                 type: string
 *                 description: Name of the hotel
 *               hotelAddress:
 *                 type: string
 *                 description: Physical address of the hotel
 *               roomTypes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of room types available in the hotel
 *     responses:
 *       201:
 *         description: Hotel added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 hotel:
 *                   $ref: '#/components/schemas/Hotel'
 *       403:
 *         description: Unauthorized user
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */

hotelRouter.post('/hotel', requireLogin, async (req, res) => {
    const { hotelName, hotelAddress, phoneNumber, roomTypes, hotelPhotos, hotelAmenities, managedBy } = req.body;

    const { user } = req;

    if (user.role == roles.USER) {
        return res.status(403).json({ error: "Unauthorized user" })
    }

    else if (user.role == roles.ADMIN) {

    try {
        // Process each room type and save roomIds
        const roomIds = await Promise.all(roomTypes.map(async (type) => {
            const room = new RoomId({ roomType: type });
            console.log("room"+room);
            await room.save();
            return room._id; // Collect the ID of the newly created RoomId document
        }));

        // Create a new hotel instance
        const newHotel = new Hotel({
            hotelName,
            hotelAddress,
            phoneNumber,
            rooms : roomIds,
            hotelPhotos,
            hotelAmenities,
            managedBy,
        });

        // Save the hotel to the database
        const savedHotel = await newHotel.save();

        res.status(201).json({ message: "Hotel added successfully", savedHotel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
    }
});


//API to delete hotel by admin
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


//API to get hotel by ID
/**
 * @swagger
 * /hotels/{hotelId}:
 *   get:
 *     summary: Get a hotel by ID
 *     tags: [Hotel]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         schema:
 *           type: string
 *         description: The hotel ID
 *     responses:
 *       200:
 *         description: Returns the hotel
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       404:
 *         description: Hotel not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */
hotelRouter.get('/hotel/find/:hotelId?', async (req, res) => {
    const { hotelId } = req.params;

    try {
        if (hotelId) {
            // Find the hotel by ID
            const hotel = await Hotels.findById(hotelId);

            if (!hotel) {
                return res.status(404).json({ error: "Hotel not found." });
            }

            res.json(hotel); // Return the found hotel
        } else {
            // If no hotelId is provided, return all hotels
            const hotels = await Hotels.find();
            res.json(hotels); // Return all hotels
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


export default hotelRouter;