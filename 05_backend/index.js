// external dependencies
import express, { json } from "express"
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
import cloudinary from 'cloudinary'


//internal dependencies
import authRouter from "./routes/auth.js"
import profileRouter from "./routes/profile.js"
import walletRouter from "./routes/wallet.js"
import checkoutRouter from "./routes/checkout.js"

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

<<<<<<< HEAD
// hotel route
app.use('/',hotelRouter)


// room route
app.use('/',roomRouter)

=======
//profile route
app.use('/',profileRouter)

//Wallet route
app.use('/',walletRouter)

//checkout Router
app.use('/',checkoutRouter)


>>>>>>> a21ba2adec897eb1c5e3a0b125ee5d052c251abd
/**connect to mongodb
 *  */
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected");
        app.listen(process.env.PORT, () => {
            console.log("Listining on " + process.env.PORT);
         })
    })



