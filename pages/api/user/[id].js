import dbConnect from "@/lib/mongodb";
import User from "@/models/User";  

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  try {
    // ---------------------------------------------------------
    // ۱. مشاهده اطلاعات یک کاربر خاص (GET)
    // ---------------------------------------------------------
    if (req.method === "GET") {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "کاربر پیدا نشد",
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    }

    // ---------------------------------------------------------
    // ۲. حذف یک کاربر (DELETE)
    // ---------------------------------------------------------
    if (req.method === "DELETE") {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "کاربر پیدا نشد و امکان حذف وجود ندارد",
        });
      }

      return res.status(200).json({
        success: true,
        message: "کاربر با موفقیت حذف شد",
      });
    }

    // ---------------------------------------------------------
    // مدیریت متدهای دیگر
    // ---------------------------------------------------------
    return res.status(405).json({
      success: false,
      message: "متد مجاز نیست (فقط GET و DELETE)",
    });

  } catch (error) {
    console.error("User API Error:", error);
    return res.status(500).json({
      success: false,
      message: "خطای سرور در مدیریت کاربران",
    });
  }
}
