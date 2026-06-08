import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  createdAt: { type: Date, default: Date.now },
});

// اگر مدل وجود داشت از آن استفاده کن، در غیر این صورت آن را بساز
export default mongoose.models.User || mongoose.model('User', UserSchema);
