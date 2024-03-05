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

//profile route
app.use('/',profileRouter)

//Wallet route
app.use('/',walletRouter)
/**connect to mongodb
 *  */
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected");
        app.listen(process.env.PORT, () => {
            console.log("Listining on " + process.env.PORT);
         })
    })



