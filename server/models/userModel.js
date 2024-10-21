import mongoose from "mongoose";

const userModel = mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  creditBalance: { type: Number, default: 5 },
});

const User = mongoose.models.User || mongoose.model("User", userModel);

export default User;
