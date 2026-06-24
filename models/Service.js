import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان سرویس الزامی است"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "slug الزامی است"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "توضیحات سرویس الزامی است"],
      trim: true,
    },
    shortDescription: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      required: [true, "تصویر سرویس الزامی است"],
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: "",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
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

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
