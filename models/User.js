import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  // این فیلدها وجود نداشتند در حالی که API های ورود/ثبت‌نام/فراموشی رمز به آن‌ها نیاز داشتند (باگ اصلی احراز هویت)
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: null
  },

  password: {
    type: String,
    default: null
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  resetPasswordToken: {
    type: String,
    default: null
  },

  resetPasswordExpires: {
    type: Date,
    default: null
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
