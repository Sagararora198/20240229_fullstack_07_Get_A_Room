//external dependencies
import  express,{ Router }  from "express";
import 'dotenv/config'
import mongoose from "mongoose"
//internal dependencies
import { roles } from "../dependencies/constants/userConstants.js";
import requireLogin from "../middleware/requireLogin.js";
import Bookings from "../models/Booking.js";
const bookingRouter = express.Router()

/**Getting the booking details
 * If it is user then only his/her booked hotel will be shown 
 * If it is admin then all the booked hotel that he/she manages will be shown 
*/
/**Booking Router
 * 
 * @swagger
 * /booking:
 *   get:
 *     summary: Fetches booking details
 *     description: >
 *       Retrieves booking details. If the requester is a user, only bookings made by the user are shown.
 *       If the requester is an admin, all bookings managed by the admin are shown.
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: A list of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: An error occurred while fetching booking details
 *     security:
 *       - bearerAuth: []
 */
bookingRouter.get('/booking',requireLogin,async(req,res)=>{
  const {user}=req;
  console.log(user);
  //checking all possible roles present 
  const availableRoles=Object.values(roles)
  console.log(availableRoles);
  // whether the user is any one of them
  if(availableRoles.includes(user.role)){
    try {
      let bookings;
      if (user.role=== roles.ADMIN) {
        // Fetch all bookings for admin
        bookings = await Bookings.find({});
      } else if (user.role === roles.USER) {
        // Fetch bookings only for this user
        bookings = await Bookings.find({ userId: user._id });
      }
       else {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
        
      res.json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching booking details' });
    }
  }
})

//export the api calls
export default bookingRouter