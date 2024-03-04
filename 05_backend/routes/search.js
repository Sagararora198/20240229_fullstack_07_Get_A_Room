import express from "express";
import 'dotenv/config';
import mongoose from "mongoose";
import Hotels from "../models/Hotel.js";

const searchRouter = express.Router();

// New route to get hotels with top ratings
searchRouter.get('/hotels/top-rated', async (req, res) => {
    try {
        //to return only the top 10 rated hotels
        const topRatedHotels = await Hotels.find({}).sort({rating: -1}).limit(10);
        res.json(topRatedHotels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

searchRouter.get('/hotels', async (req, res) => {
    // Required params
    const location = req.query.searchLocation;
    const checkinDate = req.query.checkInDate;

    // Optional params with default values
    let checkoutDate = req.query.checkOutDate;
    let guestNo = req.query.noOfGuest || 1; // Default guest number is 1

    if (!location || !checkinDate) {
        return res.status(422).json({ error: "Please enter required fields" });
    }

    // Calculate default checkoutDate as one day after checkinDate if not provided
    if (!checkoutDate) {
        const checkinDateObj = new Date(checkinDate);
        const defaultCheckoutDateObj = new Date(checkinDateObj.setDate(checkinDateObj.getDate() + 1));
        checkoutDate = defaultCheckoutDateObj.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    }

    try {
        // Basic query with required parameters
        let query = { 
            hotelAddress: location,
        };

        // Adjusted optional parameters in the query
        if (checkoutDate) {
            query.checkoutDate = { $lte: new Date(checkoutDate) };
        }
        if (guestNo) {
            query.maxGuests = { $gte: guestNo };
        }

        // Find hotels based on query
        let hotels = await Hotels.find(query);

        // Optional sorting
        const price = req.query.sortPrice;
        const rating = req.query.sortRating;
        if (price) {
            hotels = hotels.sort((a, b) => price === 'low' ? a.price - b.price : b.price - a.price);
        }
        if (rating) {
            hotels = hotels.sort((a, b) => rating === 'high' ? b.rating - a.rating : a.rating - b.rating);
        }

        res.json(hotels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

searchRouter.get('/hotel/rooms', async (req, res) => {
    const { hotelName, hotelId } = req.query;
  
    // Check if neither hotelName nor hotelId is provided in the query parameters
    if (!hotelName && !hotelId) {
      // Respond with a 400 Bad Request status code and a specific error message
      return res.status(400).json({ error: "Hotel name or hotel ID parameter is required." });
    }
  
    try {
      let hotel;
      // If hotelName is provided, attempt to find the hotel by its name
      if (hotelName) {
        hotel = await Hotel.findOne({ name: hotelName });
        if (!hotel) {
          // If the hotelName is provided but not found, respond with a 404 Not Found status code and error message
          return res.status(404).json({ error: "Hotel not found." });
        }
      } 
      // If hotelId is provided, attempt to find the hotel by its ID
      else if (hotelId) {
        hotel = await Hotel.findById(hotelId);
        if (!hotel) {
          // If the hotelId is provided but not found, respond with a 404 Not Found status code and error message
          return res.status(404).json({ error: "Hotel not found." });
        }
      }
  
      // Find all rooms associated with the found hotel's ID
      const rooms = await Room.find({ hotel: hotel._id });
      if (rooms.length === 0) {
        // If no rooms are found for the hotel, respond with a 404 Not Found status code and error message
        return res.status(404).json({ error: "No rooms found for the specified hotel." });
      }
  
      // Respond with the found rooms in JSON format
      res.status(200).json({ rooms });
    } catch (error) {
      // If an error occurs during the process, log the error and respond with a 500 Internal Server Error status code and error message
      console.error(error);
      res.status(500).json({ error: "Internal Server Error. Please try again later." });
    }
});



export default searchRouter;