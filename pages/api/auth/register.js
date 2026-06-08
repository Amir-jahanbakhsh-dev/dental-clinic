// این کد برای Pages Router است
import { NextResponse } from "next/server"; 
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb"; 
import User from "@/models/User"; 
export default async function handler(req, res) { 
  if (req.method === 'POST') {
    try {
      await dbConnect();
      
      // در Pages Router، داده‌ها از req.body می‌آیند
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "همه فیلدها الزامی هستند" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "این ایمیل قبلاً ثبت شده است" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      // اطلاعات کاربر را بدون رمز عبور برگردان
      const newUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      };

      return res.status(201).json({
        message: "کاربر با موفقیت ثبت شد",
        user: newUser,
      });

    } catch (error) {
      console.error("خطای سرور در API:", error);
      // اگر خطای JSON parsing بود (مثلاً بدنه درخواست خالی یا نامعتبر)
      if (error.message.includes('JSON')) { // این یک روش تقریبی است
        return res.status(400).json({ message: "خطا در دریافت JSON، فرمت درخواست نامعتبر است." });
      }
      return res.status(500).json({ message: "خطای داخلی سرور", error: error.message });
    }
  } else {
    // اگر متد درخواست POST نبود
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
