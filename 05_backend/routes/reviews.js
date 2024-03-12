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
 *     summary: Add a review for a hotel
 *     description: Allows authenticated users to add a review for a specific hotel by providing a rating and review text.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: hotelId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the hotel to review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - review
 *             properties:
 *               rating:
 *                 type: integer
 *                 format: int32
 *                 description: Rating given to the hotel, must be between 0 and 5.
 *                 example: 4
 *               review:
 *                 type: string
 *                 description: The review text.
 *                 example: "Great experience, will definitely come back!"
 *     responses:
 *       200:
 *         description: Review added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review added successfully.
 *       400:
 *         description: Invalid rating. Rating must be between 0 and 5.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid rating. Rating must be between 0 and 5.
 *       404:
 *         description: Hotel not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Hotel not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error.
 *     tags:
 *       - Reviews
 */
reviewRouter.post('/reviews', requireLogin, async (req, res) => {
    const { hotelId } = req.query; // Assuming hotelId is passed as a query parameter
    const { rating, review } = req.body;
    console.log("body : " + req.body);
    const { user } = req;


    console.log("rating" + rating);

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