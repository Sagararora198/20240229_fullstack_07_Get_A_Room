import express from "express";
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import Hotels from "../models/Hotel.js";

const hotelRouter = express.Router();

// Middleware to verify if the user is an admin
const verifyAdmin = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "JWT token is missing." });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "Invalid JWT token." });
        }
        // Assuming the payload contains isAdmin property
        if (!payload.isAdmin) {
            return res.status(403).json({ error: "Access forbidden. Admin access required." });
        }
        req.user = payload; // Add user payload to request
        next();
    });
};

// API to update hotel properties by admin
hotelRouter.put('/hotel/:hotelId', verifyAdmin, async (req, res) => {
    const { hotelId } = req.params;
    const { hotelName, hotelVisibility, hotelPhotos, hotelPhoneNumber, hotelLocation, hotelAmenities } = req.body;

    if (!hotelId) {
        return res.status(400).json({ error: "hotelId is missing." });
    }

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
});

export default hotelRouter;