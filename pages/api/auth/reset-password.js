import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: "توکن و رمز عبور جدید الزامی هستند" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "رمز عبور باید حداقل ۶ کاراکتر باشد" });
  }

  await dbConnect();

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "لینک بازیابی نامعتبر است یا منقضی شده است. لطفاً دوباره درخواست دهید.",
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return res.status(200).json({ message: "رمز عبور با موفقیت تغییر کرد" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ message: "خطای سرور در تغییر رمز عبور" });
  }
}
