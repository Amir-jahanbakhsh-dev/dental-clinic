import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    await dbConnect();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "ایمیل و رمز عبور الزامی هستند" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "کاربری با این ایمیل پیدا نشد" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "ایمیل یا رمز عبور اشتباه است" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET || "dev_secret_change_me",
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: "ورود موفق بود",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login API error:", error);
    return res.status(500).json({
      message: "خطای داخلی سرور",
      error: error.message,
    });
  }
}
