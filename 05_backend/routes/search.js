import express from "express";
import 'dotenv/config';
import Hotels from "../models/Hotel.js";
import Reviews from "../models/Reviews.js";


const searchRouter = express.Router();

// New route to get hotels with top ratings
/**
 * @swagger
 * /hotels/top-rated:
 *  get:
 *    summary: Retrieves top-rated hotels
 *    description: Retrieves the top 10 rated hotels based on user reviews.
 *    tags: [Hotel]
 *    responses:
 *      200:
 *        description: Successfully retrieved top-rated hotels.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Hotel'
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
 *                  example: "Internal server error"
 * 
 */
searchRouter.get('/hotels/top-rated', async (req, res) => {
  try {
    //to return only the top 10 rated hotels
    const topRatedReviews = await Reviews.find({}).sort({ rating: -1 }).limit(10);
    // res.json(topRatedReviews);
    const hotelIds = topRatedReviews.map(review => review.reviewedTo);

    // Find the corresponding hotels for the extracted hotelIds
    // Using the $in operator to find all hotels whose _id is in the hotelIds array
    const topRatedHotels = await Hotels.find({
      '_id': { $in: hotelIds }
    });

    // Now topRatedHotels contains the list of hotels corresponding to the top-rated reviews
    // You can return this list to the client
    res.json(topRatedHotels);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


/**
 * @swagger
 * /hotels:
 *  get:
 *    summary: Retrieves hotels based on search criteria
 *    description: Retrieves hotels based on the provided search criteria such as location, check-in date, and optional parameters like check-out date, number of guests, and sorting options.
 *    tags: [Hotel]
 *    parameters:
 *      - in: query
 *        name: searchLocation
 *        required: true
 *        description: The location to search for hotels.
 *        schema:
 *          type: string
 *      - in: query
 *        name: checkInDate
 *        required: true
 *        description: The check-in date in YYYY-MM-DD format.
 *        schema:
 *          type: string
 *          format: date
 *      - in: query
 *        name: checkOutDate
 *        description: The optional check-out date in YYYY-MM-DD format. Defaults to the day after check-in date if not provided.
 *        schema:
 *          type: string
 *          format: date
 *      - in: query
 *        name: noOfGuest
 *        description: The optional number of guests. Defaults to 1 if not provided.
 *        schema:
 *          type: integer
 *          minimum: 1
 *      - in: query
 *        name: sortPrice
 *        description: Sort hotels by price. Values can be 'low' or 'high'.
 *        schema:
 *          type: string
 *          enum: [low, high]
 *      - in: query
 *        name: sortRating
 *        description: Sort hotels by rating. Values can be 'top'.
 *        schema:
 *          type: string
 *          enum: [top]
 *    responses:
 *      200:
 *        description: Successfully retrieved hotels based on the search criteria.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Hotel'
 *      422:
 *        description: Unprocessable Entity. Please enter required fields.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating missing required fields.
 *                  example: "Please enter required fields"
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
 *                  example: "Internal server error"
 */
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
    let hotels = await Hotels.find({ hotelAddress: location });

    // Optional sorting
    const price = req.query.sortPrice;
    const rating = req.query.sortRating;
    if (price) {
      hotels = hotels.sort((a, b) => price === 'low' ? a.price - b.price : b.price - a.price);
    }
    if (rating) { 
      // Extract hotel IDs from the hotels array
      const hotelIds = hotels.map(hotel => hotel._id);

      // Find the top-rated reviews for these hotels
      const topRatedReviews = await Reviews.find({
        reviewedTo: { $in: hotelIds }
      }).sort({ rating: -1 }).limit(10);

      // Extract hotelIds from the top-rated reviews
      const topRatedHotelIds = topRatedReviews.map(review => review.reviewedTo);

      // Filter the original hotels array to include only those hotels that have top-rated reviews
      hotels = hotels.filter(hotel => topRatedHotelIds.includes(hotel._id));
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