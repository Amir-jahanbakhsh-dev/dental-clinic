import mongoose from 'mongoose';

// استفاده از متغیر محیطی. اگر وجود نداشت، از لوکال‌هست استفاده کن
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dentalClinic';

if (!process.env.MONGODB_URI) {
  console.warn("هشدار: MONGODB_URI ست نشده است، از دیتابیس لوکال استفاده می‌شود.");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    // اتصال به دیتابیس
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
