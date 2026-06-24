import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  try {
    // -----------------------------
    // تأیید نوبت
    // -----------------------------
    if (req.method === "PATCH") {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { status: "تأیید شده" },
        { new: true }
      );

      if (!updatedAppointment) {
        return res.status(404).json({
          success: false,
          message: "نوبت پیدا نشد",
        });
      }

      return res.status(200).json({
        success: true,
        message: "نوبت با موفقیت تأیید شد",
        data: updatedAppointment,
      });
    }

    // -----------------------------
    // حذف نوبت
    // -----------------------------
    if (req.method === "DELETE") {
      const deletedAppointment = await Appointment.findByIdAndDelete(id);

      if (!deletedAppointment) {
        return res.status(404).json({
          success: false,
          message: "نوبت پیدا نشد",
        });
      }

      return res.status(200).json({
        success: true,
        message: "نوبت با موفقیت حذف شد",
        data: deletedAppointment,
      });
    }

    // -----------------------------
    // متدهای غیرمجاز
    // -----------------------------
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  } catch (error) {
    console.error("Appointment API Error:", error);

    return res.status(500).json({
      success: false,
      message: "خطای سرور",
    });
  }
}
