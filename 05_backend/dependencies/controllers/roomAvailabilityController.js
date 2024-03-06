import Hotel from "../../models/Hotel.js";
import RoomId from "../../models/roomId.js";
import Rooms from "../../models/rooms.js";
import Bookings from "../../models/Booking.js";
import mongoose from "mongoose";
/** The function will filter out the available room for in the period mentioned
 * 
 * @param {String} usercheckindate checkin date in YYYY-MM-DD format
 * @param {String} usercheckoutdate checkout date in YYYY-MM-DD format
 * @param {String} hotelid hotelId
 * @returns {Array<{}>}
 */
async function availableRooms(usercheckindate,usercheckoutdate,hotelid){
    const desiredCheckinDate = new Date(usercheckindate)
    const desiredCheckoutDate = new Date(usercheckoutdate)
    const emptyRooms = await Hotel.aggregate([
        {
          '$match': {
            '_id': new mongoose.Types.ObjectId(hotelid)
          }
        }, {
          '$lookup': {
            'from': 'roomids', 
            'localField': 'rooms', 
            'foreignField': '_id', 
            'as': 'roomIds'
          }
        }, {
          '$unwind': '$roomIds'
        }, {
          '$lookup': {
            'from': 'rooms', 
            'localField': 'roomIds._id', 
            'foreignField': 'roomType', 
            'as': 'listofrooms'
          }
        }, {
          '$unwind': '$listofrooms'
        }, {
          '$lookup': {
            'from': 'bookings', 
            'localField': 'listofrooms._id', 
            'foreignField': 'bookedRoom', 

            'as': 'bookings'
          }
        },
        {$match: {
            "bookings":{
                $not:{
                    $elemMatch:{
                        $or:[
                            {
                                checkinDate:{$lt:desiredCheckinDate},
                                checkoutDate:{$gt:desiredCheckoutDate}
                            }
                        ]
                    }
                }
            }
        }},
        
        {
          '$project': {
            "hotelName":1,
            "listofrooms":1,
            "roomIds":1,
            "bookings":1,
            
            

          }
        }
      ])

    //   const availableRoomsArray = emptyRooms.map(doc=>doc.availableRooms)
    //   return availableRoomsArray
    // console.log(emptyRooms);
    return emptyRooms

}
export default availableRooms




// for testing
// availableRooms("2024-03-12","2024-03-13","65e6bf0537c8e77de452be2f")