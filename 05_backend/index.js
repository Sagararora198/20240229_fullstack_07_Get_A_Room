// external dependencies
import express, { json } from "express"
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
import cloudinary from 'cloudinary'


//internal dependencies
import authRouter from "./routes/auth.js"


const app = express()
//middleware
app.use(json())



/**Testing Working
 * 
 */
app.get('/', (req, res) => {
    console.log("works");
})


// authentication route
app.use('/',authRouter)

// hotel route
app.use('/',hotelRouter)


// room route
app.use('/',roomRouter)

/**connect to mongodb
 *  */
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected");
        app.listen(process.env.PORT, () => {
            console.log("Listining on " + process.env.PORT);
         })
    })



