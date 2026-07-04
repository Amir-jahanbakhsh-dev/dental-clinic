import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان مقاله الزامی است"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "slug الزامی است"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: [true, "متن مقاله الزامی است"],
      trim: true,
    },
    summary: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["منتشر شده", "پیش‌نویس"],
      default: "پیش‌نویس",
    },
    category: {
      type: String,
      default: "",
      trim: true,
    },
    metaTitle: {
      type: String,
      default: "",
      trim: true,
    },
    metaDescription: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Article || mongoose.model("Article", ArticleSchema);
