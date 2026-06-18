import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();    

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "ابتدا وارد حساب کاربری شوید" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const appointments = await Appointment.find({ user: decoded.id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    return res.status(403).json({ message: "توکن نامعتبر است" });
  }
}
