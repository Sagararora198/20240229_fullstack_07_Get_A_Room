import express, { Router } from "express";
import 'dotenv/config'
import requireLogin from "../middleware/requireLogin.js";
import Users from "../models/User.js";
import { roles } from "../dependencies/constants/userConstants.js";
const walletRouter = express.Router()

//getting the user's wallet amount by either user or admin 
//admin can see all other user wallet amount whereas the user
// can only see it's own wallet amount 
/**
 * @swagger
 * /wallet:
 *  get:
 *    summary: Retrieves wallet information
 *    description: Retrieves wallet information for the authenticated user. If the user is an admin, it retrieves wallet information for all users except the admin.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Successful retrieval of wallet information.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                wallet:
 *                  type: number
 *                  description: The wallet amount of the user.
 *                  example: 1000
 *      401:
 *        description: Unauthorized access.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: Unauthorized access
 *      404:
 *        description: User or users not found.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: User not found
 *      500:
 *        description: Internal Server Error. Something went wrong on the server.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: An error occurred while retrieving the user
 */
walletRouter.get('/wallet', requireLogin, async (req, res) => {
  const { user } = req;
  //all available roles present 
  const availableRoles = Object.values(roles)

  if (availableRoles.includes(user.role) && user.role===roles.USER) {
    try {
      const userdata = await Users.findById(user._id);

      if (!userdata) {
        return res.status(404).send('User not found');
      }

      // Assuming the user object has a 'wallet' property
      const walletAmount = userdata.wallet;

      // Send the wallet amount in the response
      return res.status(200).json({ wallet: walletAmount });
    } catch (error) {
      console.error(error);
      return res.status(500).send('An error occurred while retrieving the user');
    }
  }
  else if (user.role === roles.ADMIN) {
    // If the user is an admin, return the wallet amounts of all users except their own
    try {
      const usersData = await Users.find({ _id: { $ne: user._id }}).select('wallet name'); // Exclude the admin's own data

      if (!usersData) {
        return res.status(404).send('No users found');
      }

      // Send the wallet amounts of all users except the admin
      return res.status(200).json(usersData);
    } catch (error) {
      console.error(error);
      return res.status(500).send('An error occurred while retrieving users');
    }
  } else {
    // If the user's role is neither USER nor ADMIN, or if roles are not properly defined
    return res.status(401).send('Unauthorized access');
  }
})

//adding amount to the specified user
//This can only be done by the admin 

/**
 * @swagger
 * /addMoney:
 *  put:
 *    summary: Adds money to a user's wallet
 *    description: Adds money to a user's wallet by specifying the user's ID and the amount to add. Only admins can perform this action.
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - userId
 *              - changeamount
 *            properties:
 *              userId:
 *                type: string
 *                description: The ID of the user to add money to.
 *                example: "609cf72c9864e620ec51344a"
 *              changeamount:
 *                type: number
 *                description: The amount of money to add to the user's wallet.
 *                example: 100
 *    responses:
 *      200:
 *        description: Successfully added money to the user's wallet.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message indicating the amount added to the user's wallet.
 *                  example: "Successfully added $100 to user's account"
 *                userId:
 *                  type: string
 *                  description: The ID of the user whose wallet was updated.
 *                  example: "609cf72c9864e620ec51344a"
 *                newWalletAmount:
 *                  type: number
 *                  description: The updated wallet amount of the user.
 *                  example: 500
 *      400:
 *        description: Invalid amount specified.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: "Invalid amount specified"
 *      403:
 *        description: Unauthorized. Only admins can perform this action.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: "Unauthorized: Only admins can perform this action"
 *      404:
 *        description: User not found.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: "User not found"
 *      500:
 *        description: Internal Server Error. Something went wrong on the server.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: "An error occurred while updating the user account"
 */
walletRouter.put('/addMoney', requireLogin, async (req, res) => {
  const { user } = req; // The admin user making the request
  const { userId, changeamount } = req.body; // Extract userId and changeamount from the request body

  // First, check if the logged-in user is an admin
  if (user.role !== roles.ADMIN) {
    return res.status(403).send('Unauthorized: Only admins can perform this action');
  }
  // Check if the changeamount is a valid number and greater than 0
  if (!changeamount || isNaN(changeamount) || changeamount <= 0) {
    return res.status(400).send('Invalid amount specified');
  }
  
  try {
    // Find the user by ID and update their wallet
    const targetUser = await Users.findById(userId);

    if (!targetUser) {
      return res.status(404).send('User not found');
    }

    // Assuming the user object has a 'wallet' property that stores the amount
    targetUser.wallet = changeamount; // Add the specified amount to the user's wallet

    await targetUser.save(); // Save the updated user document

    // Send a success response
    return res.status(200).json({
      message: `Successfully changed ${changeamount} to user's account`,
      userId: targetUser._id,
      newWalletAmount: targetUser.wallet
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred while updating the user account');
  }
});

//export the apiCalls
export default walletRouter