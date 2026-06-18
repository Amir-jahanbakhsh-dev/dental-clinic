import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import User from "@/models/User";
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  try {
    const appointments = await Appointment.find({})
      .populate("user", "name email") // فرض می‌کنیم هنوز می‌خواهیم اطلاعات کاربر را هم نمایش دهیم
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Error fetching all appointments:", error); // برای دیباگ در سمت سرور
    return res.status(500).json({
      message: "خطا در دریافت نوبت‌ها",
      error: error.message,
    });
  }
}
