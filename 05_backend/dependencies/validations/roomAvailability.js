Bookings.aggregate([
    {
      $match: {
        // Filter out bookings that conflict with the desired dates
        $or: [
          { checkinDate: { $gte: desiredCheckoutDate } },
          { checkoutDate: { $lte: desiredCheckinDate } }
        ]
      }
    },
    {
      $lookup: {
        from: "rooms",
        localField: "bookedRoom",
        foreignField: "_id",
        as: "roomDetails"
      }
    },
    {
      $unwind: "$roomDetails"
    },
    {
      $lookup: {
        from: "roomids", // Assuming room types are stored in a collection named "roomids"
        localField: "roomDetails.roomType",
        foreignField: "_id",
        as: "roomTypeDetails"
      }
    },
    {
      $unwind: "$roomTypeDetails"
    },
    // Add more stages as needed to further group by hotel, etc.
    {
      $group: {
        _id: "$roomTypeDetails.roomType",
        rooms: { $push: "$roomDetails" }
      }
    }
    // You might need additional stages to filter and group by hotels
  ]);