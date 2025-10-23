import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, },
    username: { type: String, required: true },
    profilePicture: { type: String,},
    coverPicture: { type: String, },
    razorpayId: { type: String, },
    razorpaySecret: { type: String, }
    });


// const User = model("User", UserSchema);
export default mongoose.models.User || model("User", UserSchema);