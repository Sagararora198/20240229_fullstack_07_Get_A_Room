// external dependencies
import express, { json } from "express"
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
import cloudinary from 'cloudinary'
var app = express()

//internal dependencies
import authRouter from "./routes/auth.js"
import profileRouter from "./routes/profile.js"
import walletRouter from "./routes/wallet.js"
import checkoutRouter from "./routes/checkout.js"
import bookingRouter from "./routes/booking.js"
import hotelRouter from "./routes/hotel.js"
import roomRouter from "./routes/room.js"
import reviewRouter from "./routes/reviews.js"
import searchRouter from "./routes/search.js"
import availableRooms from "./dependencies/controllers/roomAvailabilityController.js"

//To create Swagger UI page for your API's
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Dynamically import the swagger-jsdoc module
// import('swagger-jsdoc').then(swaggerJSDoc => {
//     const swaggerDefinition = {
//         openapi: '3.0.0',
//         info: {
//             title: 'Express API for JSONPlaceholder',
//             version: '1.0.0',
//         },
//         server:{
//             url:"http://localhost:3000/"
//         }
//     };
//     const options = {
//         swaggerDefinition,
//         // Paths to files containing OpenAPI definitions
//         apis: ['./routes/*.js'],
//     };
//     // Use the .default property since swaggerJSDoc is a CommonJS module
//     const swaggerSpec = swaggerJSDoc.default(options);
    
//     //one to set up Swagger UI with the swaggerSpec definitions and 
//     // one to serve it to the /docs endpoint.
//     app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// }).catch(error => console.error('Failed to load module:', error));

var app = express();

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
    },
    servers: [{
        url: "http://localhost:3000/"
    }]
};

// Options for the swagger docs
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./index.js'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

// Serve swagger docs the way you like (Recommendation: swagger-ui-express)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));





// middleware
app.use(json())

// availableRooms("2024-03-12","2024-03-14","65e6bf0537c8e77de452be2f")
// .then(result=>{
//   console.log(result);
// })



/**
 * @swagger
 * /signup:
 *  post:
 *      summary: Signs up a new user
 *      description: Creates a new user account with a username, email, and password. Returns a success message if the account is created successfully.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - email
 *                          - password
 *                      properties:
 *                          username:
 *                              type: string
 *                              description: The user's chosen username.
 *                              example: "newUser123"
 *                          email:
 *                              type: string
 *                              description: The user's email address.
 *                              example: "user@example.com"
 *                          password:
 *                              type: string
 *                              description: The user's chosen password.
 *                              example: "password123"
 *      responses:
 *          200:
 *              description: User created successfully. Returns a success message.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Success message.
 *                                  example: "saved successfully"
 *          400:
 *              description: Bad Request. Validation failed for the provided user data.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: Error message explaining the reason for the validation failure.
 *                                  example: "Validation error message"
 *          422:
 *              description: Unprocessable Entity. The email is already in use.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: Error message explaining that the email is already in use.
 *                                  example: "User with email - user@example.com already exists"
 *          500:
 *              description: Internal Server Error. Something went wrong on the server.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: Error message explaining the reason for the server error.
 *                                  example: "Internal Server Error"
 */
/**
 * @swagger
 * /signin:
 *  post:
 *      summary: Signs in a user
 *      description: Authenticates a user by their email and password, and returns a token if successful.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: The user's email address.
 *                              example: "user@example.com"
 *                          password:
 *                              type: string
 *                              description: The user's password.
 *                              example: "password123"
 *      responses:
 *          200:
 *              description: Successfully authenticated. Returns a token.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
 *                                  description: Authentication token.
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0NTY3ODkwIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *          422:
 *              description: Unprocessable Entity. Either email or password validation failed, or the user does not exist, or the password is incorrect.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: Error message explaining the reason for the failure.
 *                                  example: "please enter all fields"
 *          500:
 *              description: Internal Server Error. Something went wrong on the server.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: Error message explaining the reason for the server error.
 *                                  example: "Internal Server Error"
 */
app.use('/',authRouter)


app.use('/',hotelRouter)


// room route
app.use('/',roomRouter)

//profile route
app.use('/',profileRouter)

//Wallet route
app.use('/',walletRouter)

//checkout Router
app.use('/',checkoutRouter)

//booking Router
app.use('/',bookingRouter)

//review router
app.use('/',reviewRouter)

// search route
app.use('/',searchRouter)

/**connect to mongodb
 *  */
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected");
        app.listen(process.env.PORT, () => {
            console.log("Listining on " + process.env.PORT);
         })
    })



