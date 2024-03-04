import express, { json } from "express"
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
import Users from "./models/User.js"
import Hotel from "./models/Hotel.js"
import Reviews from "./models/Reviews.js"
import Bookings from "./models/Booking.js"
import Rooms from "./models/rooms.js"
import router from "./routes/auth.js"
const app = express()
app.use(json())

/**Testing Working
 * 
 */
app.get('/', (req, res) => {
    console.log("works");
})



app.use('/',router)

/**connect to mongodb
 *  */
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected");
})



app.listen(process.env.PORT, () => {
    console.log("Listining on " + process.env.PORT);
})
