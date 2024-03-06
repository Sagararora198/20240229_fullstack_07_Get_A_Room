//internal 
import  express,{ Router }  from "express";
import 'dotenv/config'
import mongoose from "mongoose"
import { roles } from "../dependencies/constants/userConstants.js";
import requireLogin from "../middleware/requireLogin.js";
import Bookings from "../models/Booking.js";
const checkoutRouter = express.Router()



checkoutRouter.post('/checkout', requireLogin, async (req, res) => {
  const { user } = req;
  const { checkinDate, checkoutDate, paymentDetails, roomId } = req.body; // Assuming roomId is passed in the request body

  // Ensure all required fields are provided
  if (!checkinDate || !checkoutDate || !paymentDetails || !roomId) {
    return res.status(400).send('Missing required booking details');
  }

  // Check if the user's role is allowed to make a booking
  const availableRoles = Object.values(roles);
  if (!availableRoles.includes(user.role)) {
    return res.status(403).send('Unauthorized: Your role is not allowed to make bookings');
  }

  try {
    // Create a new booking object
    const newBooking = new Booking({
      bookingDate: new Date(), // Current date as the booking date
      bookedBy: user._id, // User's ID from the request
      bookedRoom: roomId, // Room ID from the request body
      checkinDate: new Date(checkinDate), // Assuming checkinDate is in a format that can be directly converted to a Date object
      checkoutDate: new Date(checkoutDate), // Same assumption for checkoutDate
      paymentDetails: paymentDetails,
    });

    // Save the new booking to the database
    await newBooking.save();

    // Send a success response
    res.status(201).json({
      message: 'Booking successfully created',
      booking: newBooking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).send('Internal server error');
  }
});

export default checkoutRouter;

