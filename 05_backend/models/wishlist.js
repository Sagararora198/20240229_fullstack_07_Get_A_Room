import mongoose from "mongoose";

const wishlistSchema=new mongoose.Schema({
  
    wishlist:{
      type:mongoose.Schema.Types.ObjectId,
      ref:Hotel,
      required:false
  }
  
})


const wishlist=mongoose.model('wishlist',wishlistSchema)
export default wishlist