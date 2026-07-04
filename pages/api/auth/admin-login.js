import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "نام کاربری و رمز عبور الزامی است",
    });
  }

  // نام کاربری و رمز عبور مدیر از متغیرهای محیطی خوانده می‌شود (در فایل .env تنظیم کنید)
  // در صورت عدم تنظیم، مقادیر پیش‌فرض زیر برای حالت توسعه استفاده می‌شود
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "نام کاربری یا رمز عبور مدیر اشتباه است",
    });
  }

  const token = jwt.sign(
    { role: "admin", username },
    process.env.JWT_SECRET || "dev_secret_change_me",
    { expiresIn: "8h" }
  );

  const isProd = process.env.NODE_ENV === "production";
  const cookie = [
    `adminToken=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${8 * 60 * 60}`,
    isProd ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", cookie);

  return res.status(200).json({
    success: true,
    message: "ورود به پنل مدیریت با موفقیت انجام شد",
  });
}
