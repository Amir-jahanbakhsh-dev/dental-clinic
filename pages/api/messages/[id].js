import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";

export default async function handler(req, res) {
  try {
    await dbConnect();

    const { id } = req.query;

    if (req.method === "GET") {
      const message = await Message.findById(id);
      if (!message) {
        return res.status(404).json({ message: "پیام پیدا نشد" });
      }

      if (message.status === "unread") {
        message.status = "read";
        await message.save();
      }

      return res.status(200).json(message);
    }

    if (req.method === "PATCH") {
      const { status } = req.body;

      const message = await Message.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!message) {
        return res.status(404).json({ message: "پیام پیدا نشد" });
      }

      return res.status(200).json(message);
    }

    if (req.method === "DELETE") {
      const deleted = await Message.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: "پیام پیدا نشد" });
      }

      return res.status(200).json({ message: "پیام حذف شد" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Message detail API Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
