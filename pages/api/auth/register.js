// Pages Router API
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await dbConnect();

      const { name, email, password, phone, nationalId } = req.body;


      // بررسی فیلدهای ضروری
      if (!name || !phone) {
        return res.status(400).json({
          message: "نام و شماره تلفن الزامی هستند",
        });
      }

      // بررسی تکراری بودن ایمیل
      if (email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(409).json({
            message: "این ایمیل قبلاً ثبت شده است",
          });
        }
      }

      // بررسی تکراری بودن شماره
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        return res.status(409).json({
          message: "این شماره تلفن قبلاً ثبت شده است",
        });
      }

      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone: phone || null,
        nationalId: nationalId || null
      });
      return res.status(201).json({
        message: "کاربر با موفقیت ثبت شد",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,    
          nationalId: user.nationalId,  
        },
      });

    } catch (error) {
      console.error("Server Error:", error);

      return res.status(500).json({
        message: "خطای داخلی سرور",
        error: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
