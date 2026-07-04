import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  try {
    // ۱. مشاهده جزئیات یک مقاله خاص
    if (req.method === "GET") {
      const article = await Article.findById(id);
      if (!article) {
        return res.status(404).json({ success: false, message: "مقاله پیدا نشد" });
      }
      return res.status(200).json({ success: true, data: article });
    }

    // ۲. ویرایش مقاله (Update)
    if (req.method === "PATCH") {
      const updateData = req.body;

      if (updateData.slug) {
        const duplicateSlug = await Article.findOne({
          slug: updateData.slug,
          _id: { $ne: id },
        });
        if (duplicateSlug) {
          return res.status(400).json({
            success: false,
            message: "این اسلاگ متعلق به مقاله دیگری است.",
          });
        }
      }

      const updatedArticle = await Article.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedArticle) {
        return res.status(404).json({ success: false, message: "مقاله پیدا نشد" });
      }

      return res.status(200).json({
        success: true,
        message: "مقاله با موفقیت به‌روزرسانی شد.",
        data: updatedArticle,
      });
    }

    // ۳. حذف مقاله (Delete)
    if (req.method === "DELETE") {
      const deletedArticle = await Article.findByIdAndDelete(id);

      if (!deletedArticle) {
        return res.status(404).json({
          success: false,
          message: "مقاله پیدا نشد و امکان حذف وجود ندارد.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "مقاله با موفقیت حذف شد.",
      });
    }

    return res.status(405).json({
      success: false,
      message: "متد مجاز نیست (فقط GET, PATCH و DELETE)",
    });
  } catch (error) {
    console.error("Article By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "خطای سرور در مدیریت مقاله",
    });
  }
}
