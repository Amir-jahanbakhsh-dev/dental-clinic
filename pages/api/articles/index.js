import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";

export default async function handler(req, res) {
  await dbConnect();

  try {
    // ۱. دریافت لیست همه مقالات (برای صفحه عمومی و پنل مدیریت)
    if (req.method === "GET") {
      const { status } = req.query;
      const filter = {};
      if (status) filter.status = status;

      const articles = await Article.find(filter).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        data: articles,
      });
    }

    // ۲. ساخت مقاله جدید (Create)
    if (req.method === "POST") {
      const {
        title,
        slug,
        content,
        summary,
        image,
        author,
        status,
        category,
        metaTitle,
        metaDescription,
      } = req.body;

      // اعتبارسنجی اولیه فیلدهای حیاتی - این بخش باگ اصلی ساخت مقاله بود که وجود نداشت
      if (!title || !slug || !content) {
        return res.status(400).json({
          success: false,
          message: "لطفاً تمامی فیلدهای اصلی (عنوان، اسلاگ و متن مقاله) را پر کنید.",
        });
      }

      // بررسی تکراری نبودن Slug
      const existingSlug = await Article.findOne({ slug });
      if (existingSlug) {
        return res.status(400).json({
          success: false,
          message: "این اسلاگ (Slug) قبلاً توسط مقاله دیگری استفاده شده است.",
        });
      }

      const newArticle = await Article.create({
        title,
        slug,
        content,
        summary: summary || "",
        image: image || "",
        author: author || "",
        status: status || "پیش‌نویس",
        category: category || "",
        metaTitle,
        metaDescription,
      });

      return res.status(201).json({
        success: true,
        message: "مقاله با موفقیت ساخته شد.",
        data: newArticle,
      });
    }

    return res.status(405).json({
      success: false,
      message: "متد مجاز نیست (فقط GET و POST)",
    });
  } catch (error) {
    console.error("Articles Index Error:", error);
    return res.status(500).json({
      success: false,
      message: "خطای سرور در مدیریت مقالات",
    });
  }
}
