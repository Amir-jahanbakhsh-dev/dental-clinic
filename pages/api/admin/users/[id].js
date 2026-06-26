import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
export default async function handler(req, res) {
  const {id }=req.query
  if (req.method == "GET") {

    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
      await dbConnect(); // اتصال به دیتابیس

      // پیدا کردن و حذف بیمار با ID مشخص شده
      const oneUser = await User.findById(id);

      if (!oneUser) {
        // اگر بیماری با این ID پیدا نشد
        return res.status(404).json({ message: "بیمار یافت نشد" });
      }

      // اگر موفقیت‌آمیز بود
      return res.status(200).json({
        message: "بیمار  پیدا شد",
        oneUser: oneUser,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      // برای خطاهای احتمالی در طول فرآیند 
      return res.status(500).json({ message: "خطا در سرور هنگام جستوجو بیمار" });
    }
  } else {

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
        success:true,
        message: "بیمار با موفقیت حذف شد",
        deletedUser: deletedUser,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      // برای خطاهای احتمالی در طول فرآیند حذف
      return res.status(500).json({ message: "خطا در سرور هنگام حذف بیمار" });
    }
  }


}
