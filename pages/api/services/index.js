import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";

export default async function handler(req, res) {
  await dbConnect();

  try {
    // ۱. دریافت لیست همه سرویس‌ها (برای نمایش در جدول مدیریت)
    if (req.method === "GET") {
      const services = await Service.find().sort({ order: 1, createdAt: -1 });
      return res.status(200).json({
        success: true,
        data: services,
      });
    }

    // ۲. ساخت سرویس جدید (Create)
    if (req.method === "POST") {
      const {
        title,
        slug,
        description,
        shortDescription,
        image,
        price,
        category,
        isActive,
        order,
        metaTitle,
        metaDescription,
      } = req.body;

      // اعتبارسنجی اولیه فیلدهای حیاتی
      if (!title || !slug || !description || !image) {
        return res.status(400).json({
          success: false,
          message: "لطفاً تمامی فیلدهای اصلی (عنوان، اسلاگ، توضیحات و تصویر) را پر کنید.",
        });
      }

      // بررسی تکراری نبودن Slug
      const existingSlug = await Service.findOne({ slug });
      if (existingSlug) {
        return res.status(400).json({
          success: false,
          message: "این اسلاگ (Slug) قبلاً توسط سرویس دیگری استفاده شده است.",
        });
      }

      const newService = await Service.create({
        title,
        slug,
        description,
        shortDescription,
        image,
        price: price || 0,
        category: category || "",
        isActive: isActive !== undefined ? isActive : true,
        order: order || 0,
        metaTitle,
        metaDescription,
      });

      return res.status(201).json({
        success: true,
        message: "سرویس با موفقیت ساخته شد.",
        data: newService,
      });
    }

    // اگر متد دیگری بود
    return res.status(405).json({
      success: false,
      message: "متد مجاز نیست (فقط GET و POST)",
    });

  } catch (error) {
    console.error("Admin Services Index Error:", error);
    return res.status(500).json({
      success: false,
      message: "خطای سرور در مدیریت سرویس‌ها",
    });
  }
}
