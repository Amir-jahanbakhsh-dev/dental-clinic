import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";

export default async function handler(req, res) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      const { search = "" } = req.query;

      const query = search
        ? {
            $or: [
              { sender: { $regex: search, $options: "i" } },
              { subject: { $regex: search, $options: "i" } },
              { message: { $regex: search, $options: "i" } },
            ],
          }
        : {};

      const messages = await Message.find(query).sort({ createdAt: -1 });

      return res.status(200).json(messages);
    }

    if (req.method === "POST") {
      const { sender, email, subject, message } = req.body;

      if (!sender || !subject || !message) {
        return res.status(400).json({ message: "اطلاعات ناقص است" });
      }

      const newMessage = await Message.create({
        sender,
        email,
        subject,
        message,
      });

      return res.status(201).json(newMessage);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Messages API Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
