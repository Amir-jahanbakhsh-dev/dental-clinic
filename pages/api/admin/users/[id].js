// pages/api/admin/users/[id].js
import dbConnect from "@/lib/mongodb"; // فرض می‌کنیم این فایل برای اتصال به دیتابیس است
import User from "@/models/User"; // فرض می‌کنیم مدل User شما در این مسیر است

export default async function handler(req, res) {
  const { id } = req.query; // گرفتن ID بیمار از پارامتر URL

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await dbConnect(); // اتصال به دیتابیس

    // پیدا کردن و حذف بیمار با ID مشخص شده
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      // اگر بیماری با این ID پیدا نشد
      return res.status(404).json({ message: "بیمار یافت نشد" });
    }

    // اگر حذف موفقیت‌آمیز بود
    return res.status(200).json({
      message: "بیمار با موفقیت حذف شد",
      deletedUser: deletedUser, // اختیاری: اطلاعات کاربر حذف شده را برمی‌گردانیم
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    // برای خطاهای احتمالی در طول فرآیند حذف
    return res.status(500).json({ message: "خطا در سرور هنگام حذف بیمار" });
  }
}
