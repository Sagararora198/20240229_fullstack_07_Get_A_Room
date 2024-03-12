// External dependencies
import express from "express";
import 'dotenv/config';

// Internal dependencies
import Hotels from "../models/Hotel.js";
import Reviews from "../models/Reviews.js";
import { roles } from "../dependencies/constants/userConstants.js";
import requireLogin from "../middleware/requireLogin.js";

// Create a router instance
const reviewRouter = express.Router();

//API to add reviews by authorized users only

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add a new review for a hotel
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: hotelId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the hotel being reviewed
 *       - in: body
 *         name: review
 *         description: Review details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             rating:
 *               type: number
 *               description: The rating for the hotel (0-5)
 *             review:
 *               type: string
 *               description: The review content
 *     responses:
 *       '200':
 *         description: Review added successfully
 *       '400':
 *         description: Invalid rating provided
 *       '404':
 *         description: Hotel not found
 *       '500':
 *         description: Internal server error
 */

reviewRouter.post('/reviews', requireLogin, async (req, res) => {
    try {
        // Extract data from request
        const { hotelId } = req.query; // Assuming hotelId is passed as a query parameter
        const { rating, review } = req.body;
        const { user } = req;

        // Logging for debugging
        console.log("Received review:", { rating, review });

        // Validate rating parameter
        if (rating === undefined || rating < 0 || rating > 5 || typeof rating !== 'number') {
            return res.status(400).json({ error: "Invalid rating. Rating must be between 0 and 5." });
        }

        // Check if the hotel exists
        const hotel = await Hotels.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ error: "Hotel not found." });
        }

        // Create a new review instance
        const newReview = new Reviews({
            reviewedBy: user._id, // User ID of the reviewer
            reviewedTo: hotel._id, // Hotel ID being reviewed
            review: review, // Content of the review
            rating: rating // Rating given by the reviewer
        });

        // Save the review to the database
        await newReview.save();

        // Send success response
        res.status(200).json({ message: "Review added successfully." });
    } catch (error) {
        // Handle errors
        console.error("Error adding review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Export the router
export default reviewRouter;