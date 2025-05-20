import mongoose from "mongoose";
const StreamSchema = new mongoose.Schema({
  userId:{
    type:String,
    // required:true
  },
  songId:{
    type:String,
    required:true
  },
  guestId:{
    type:String
  },
  streamLastAt:{
    type:Date,
    default: Date.now()
  }
})
export  const Streams = mongoose.model('Streams',StreamSchema)