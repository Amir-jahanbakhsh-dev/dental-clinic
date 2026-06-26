import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  phone: {
    type: String,
    required: true
  },

  nationalId: {
    type: String,
    default: ""
  },

  lastVisit: {
    type: Date,
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

const User =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
