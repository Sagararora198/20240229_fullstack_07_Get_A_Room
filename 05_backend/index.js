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

app.use('/', authRouter)

// hotel route
app.use('/', hotelRouter)

// room route
/**
 * @swagger
 * /room/hotel/{hotelId}/room:
 *  post:
 *    summary: Add a room to a hotel
 *    description: Add a new room to the specified hotel.
 *    parameters:
 *      - in: path
 *        name: hotelId
 *        description: The ID of the hotel to add the room to.
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: room
 *        description: The room object to add.
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - roomNumber
 *            - roomType
 *            - roomDesc
 *            - roomPrice
 *            - roomPhotos
 *          properties:
 *            roomNumber:
 *              type: string
 *              description: The room number.
 *            roomType:
 *              type: string
 *              description: The type of the room.
 *            roomDesc:
 *              type: string
 *              description: The description of the room.
 *            roomPrice:
 *              type: number
 *              description: The price of the room.
 *            roomPhotos:
 *              type: array
 *              description: An array of photo URLs for the room.
 *              items:
 *                type: string
 *    responses:
 *      201:
 *        description: Room added successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message.
 *                  example: "Room added successfully"
 *                room:
 *                  $ref: '#/components/schemas/Room'
 *      400:
 *        description: Bad Request. Missing required fields.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating missing required fields.
 *                  example: "Missing required fields."
 *      404:
 *        description: Not Found. Hotel not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating hotel not found.
 *                  example: "Hotel not found."
 *      500:
 *        description: Internal Server Error. Something went wrong on the server.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message explaining the reason for the server error.
 *                  example: "Internal Server Error"
 */


app.use('/', roomRouter)



/**
 * @swagger
 * /profile:
 *  get:
 *    summary: Get user profile
 *    description: Retrieve the profile of the currently logged-in user.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: User profile retrieved successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message.
 *                user:
 *                  type: object
 *                  description: User profile data.
 *      '401':
 *        description: Unauthorized. User must be logged in.
 *      '404':
 *        description: User profile not found.
 */

/**
 * @swagger
 * /profileUpdate:
 *  post:
 *    summary: Update user profile
 *    description: Update the profile information of the currently logged-in user.
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              about:
 *                type: string
 *                description: About information of the user.
 *              location:
 *                type: string
 *                description: Location information of the user.
 *              phoneNumber:
 *                type: string
 *                description: Phone number of the user.
 *    responses:
 *      '200':
 *        description: User profile updated successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message.
 *                user:
 *                  type: object
 *                  description: Updated user profile data.
 *      '401':
 *        description: Unauthorized. User must be logged in.
 *      '404':
 *        description: User profile not found.
 *      '500':
 *        description: Internal Server Error. Something went wrong on the server.
 */

//profile route
app.use('/', profileRouter)

//Wallet route
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
 *              - amountToAdd
 *            properties:
 *              userId:
 *                type: string
 *                description: The ID of the user to add money to.
 *                example: "609cf72c9864e620ec51344a"
 *              amountToAdd:
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
app.use('/', walletRouter)

//checkout Router
app.use('/', checkoutRouter)

//booking Router
app.use('/', bookingRouter)

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

//review router
app.use('/', reviewRouter)

// search route
/**
 * @swagger
 * /hotels/top-rated:
 *  get:
 *    summary: Retrieves top-rated hotels
 *    description: Retrieves the top 10 rated hotels based on user reviews.
 *    responses:
 *      200:
 *        description: Successfully retrieved top-rated hotels.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Hotel'
 *      500:
 *        description: Internal Server Error. Something went wrong on the server.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message explaining the reason for the server error.
 *                  example: "Internal server error"
 * 
 */
/**
 * @swagger
 * /hotels:
 *  get:
 *    summary: Retrieves hotels based on search criteria
 *    description: Retrieves hotels based on the provided search criteria such as location, check-in date, and optional parameters like check-out date, number of guests, and sorting options.
 *    parameters:
 *      - in: query
 *        name: searchLocation
 *        required: true
 *        description: The location to search for hotels.
 *        schema:
 *          type: string
 *      - in: query
 *        name: checkInDate
 *        required: true
 *        description: The check-in date in YYYY-MM-DD format.
 *        schema:
 *          type: string
 *          format: date
 *      - in: query
 *        name: checkOutDate
 *        description: The optional check-out date in YYYY-MM-DD format. Defaults to the day after check-in date if not provided.
 *        schema:
 *          type: string
 *          format: date
 *      - in: query
 *        name: noOfGuest
 *        description: The optional number of guests. Defaults to 1 if not provided.
 *        schema:
 *          type: integer
 *          minimum: 1
 *      - in: query
 *        name: sortPrice
 *        description: Sort hotels by price. Values can be 'low' or 'high'.
 *        schema:
 *          type: string
 *          enum: [low, high]
 *      - in: query
 *        name: sortRating
 *        description: Sort hotels by rating. Values can be 'top'.
 *        schema:
 *          type: string
 *          enum: [top]
 *    responses:
 *      200:
 *        description: Successfully retrieved hotels based on the search criteria.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Hotel'
 *      422:
 *        description: Unprocessable Entity. Please enter required fields.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message indicating missing required fields.
 *                  example: "Please enter required fields"
 *      500:
 *        description: Internal Server Error. Something went wrong on the server.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message explaining the reason for the server error.
 *                  example: "Internal server error"
 */



app.use('/',searchRouter)

/**connect to mongodb
 *  */
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("🚀 Connected to Database Successfully 🚀");
        app.listen(process.env.PORT, () => {
            console.log("🚀 Server is running 🚀 Listening on " + process.env.PORT);
        })
    })



