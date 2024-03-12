//external dependencies 
import express from "express";
import 'dotenv/config';

//internal dependencies
import Hotels from "../models/Hotel.js";
import Reviews from "../models/Reviews.js";
import { roles } from "../dependencies/constants/userConstants.js";
import requireLogin from "../middleware/requireLogin.js";

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
reviewRouter.post('/reviews',requireLogin, async (req, res) => {
    const { hotelId } = req.query; // Assuming hotelId is passed as a query parameter
    const { rating, review } = req.body;
    const {user} = req; 

    // Validate rating parameter
    if (rating === undefined || rating < 0 || rating > 5) {
        return res.status(400).json({ error: "Invalid rating. Rating must be between 0 and 5." });
    }

    try {
        // Check if the hotel exists
        const hotel = await Hotels.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ error: "Hotel not found." });
        }

        // Create a new review
        const newReview = new Reviews({
            reviewedBy: user._id,
            reviewedTo: hotel._id,
            review: review,
            rating: rating
        });

        // Save the review
        await newReview.save();

        res.status(200).json({ message: "Review added successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default reviewRouter;