import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
   _id: String,
   name: String,
   number: String,
   credits: Number,
   description: String,
   img: String,
   startDate: String,
   endDate: String,
   department: String,
   author: String
 },
 { collection: "courses" }
);
export default courseSchema;