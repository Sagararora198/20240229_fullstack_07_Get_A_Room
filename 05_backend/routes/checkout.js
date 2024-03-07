//internal dependencies
import express, { Router } from "express";
import 'dotenv/config'
import mongoose from "mongoose"

//internal dependendencies
import { roles } from "../dependencies/constants/userConstants.js";
import requireLogin from "../middleware/requireLogin.js";
import Bookings from "../models/Booking.js";
import availableRooms from "../dependencies/controllers/roomAvailabilityController.js";
import Rooms from "../models/rooms.js";
const checkoutRouter = express.Router()

const app = express(); // Create an Express application
app.use(express.json()); // Use express.json() middleware to parse JSON bodies


app.use(express.json()); // This line is crucial


checkoutRouter.post('/checkout', requireLogin, async (req, res) => {
  const { checkinDate, checkoutDate, paymentDetails, hotelId } = req.body;
  const { user } = req;

  console.log(user);
  console.log(checkinDate);

  // Ensure all required fields are provided
  if (!checkinDate || !checkoutDate || !paymentDetails || !hotelId) {
    return res.status(400).send('Missing required booking details');
  }

  // Check if the user's role is allowed to make a booking
  const availableRoles = Object.values(roles);
  if (availableRoles.includes(user.role) && user.role === roles.USER) {
    try {
      const availableRoomsList = await availableRooms(checkinDate, checkoutDate, hotelId);

      if (availableRoomsList.length === 0) {
        return res.status(404).send('No available rooms for the selected dates');
      }

      // Select an available room ID from the list
      const room = availableRoomsList[0]; // Adjust according to your actual data structure

      const existingBooking = await Bookings.findOne({
        bookedRoom: room,
        $or: [
          { checkinDate: { $lt: new Date(checkoutDate), $gte: new Date(checkinDate) } },
          { checkoutDate: { $gt: new Date(checkinDate), $lte: new Date(checkoutDate) } }
        ]
      });

      if (existingBooking) {
        return res.status(400).send('Selected room is already booked for the given dates');
      }
      
      //if the room is not present
      if (!room) {
        return res.status(404).send('Room not found');
      }

      // Create a new booking object
      const newBooking = new Bookings({
        bookingDate: new Date(), // Current date as the booking date
        bookedBy: user._id, // User's ID from the request
        bookedRoom: room, // Room ID from the request body
        checkinDate: new Date(checkinDate), //checkindate from user
        checkoutDate: new Date(checkoutDate), // checkoutDate from user
        paymentDetails: paymentDetails,
      });
      
      // Save the new booking to the database
      await newBooking.save();

      // Send a success response
      res.status(200).json({
        message: 'Booking successfully created',
        booking: newBooking,
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).send('Internal server error');
    }
  }
  else {
    return res.status(403).send('Unauthorized: Your role is not allowed to make bookings');
  }
});

export default checkoutRouter


