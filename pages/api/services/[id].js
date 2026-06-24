import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  try {
    // ۱. مشاهده جزئیات یک سرویس خاص
    if (req.method === "GET") {
      const service = await Service.findById(id);
      if (!service) {
        return res.status(404).json({ success: false, message: "سرویس پیدا نشد" });
      }
      return res.status(200).json({ success: true, data: service });
    }

    // ۲. ویرایش سرویس (Update)
    if (req.method === "PATCH") {
      const updateData = req.body;

      // اگر کاربر خواست اسلاگ را عوض کند، بررسی کنیم که تکراری نباشد
      if (updateData.slug) {
        const duplicateSlug = await Service.findOne({ 
          slug: updateData.slug, 
          _id: { $ne: id } 
        });
        if (duplicateSlug) {
          return res.status(400).json({
            success: false,
            message: "این اسلاگ متعلق به سرویس دیگری است.",
          });
        }
      }

      const updatedService = await Service.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedService) {
        return res.status(404).json({ success: false, message: "سرویس پیدا نشد" });
      }

      return res.status(200).json({
        success: true,
        message: "سرویس با موفقیت به‌روزرسانی شد.",
        data: updatedService,
      });
    }

    // ۳. حذف سرویس (Delete)
    if (req.method === "DELETE") {
      const deletedService = await Service.findByIdAndDelete(id);

      if (!deletedService) {
        return res.status(404).json({
          success: false,
          message: "سرویس پیدا نشد و امکان حذف وجود ندارد.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "سرویس با موفقیت حذف شد.",
      });
    }

    // اگر متد دیگری بود
    return res.status(405).json({
      success: false,
      message: "متد مجاز نیست (فقط GET, PATCH و DELETE)",
    });

  } catch (error) {
    console.error("Admin Service By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "خطای سرور در مدیریت سرویس",
    });
  }
}
