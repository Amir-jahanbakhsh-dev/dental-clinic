import dbConnect from "@/lib/mongodb";
import User from "@/models/User"; // مطمئن شوید که مدل User شما در اینجا تعریف شده است

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  try {
    // Find all users, sort by creation date descending (newest first)
    const users = await User.find({})
      // اگر می‌خواهید اطلاعات خاصی را populate کنید، اینجا اضافه کنید
      // مثلاً اگر نوبت‌ها را هم می‌خواهید: .populate('appointments')
      .sort({ createdAt: -1 }); 

    return res.status(200).json({
      success: true,
      users, // نام متغیر را users قرار دادیم
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res.status(500).json({
      message: "خطا در دریافت لیست کاربران",
      error: error.message,
    });
  }
}
