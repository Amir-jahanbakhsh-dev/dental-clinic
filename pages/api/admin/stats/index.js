import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment"; // نام مدل نوبت‌های شما

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  await dbConnect();

  try {
    // محاسبه آمار با استفاده از aggregate برای سرعت بسیار بالا
    const stats = await Appointment.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          confirmed: {
            $sum: { $cond: [{ $eq: ["$status", "تایید شده"] }, 1, 0] }
          },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "در انتظار"] }, 1, 0] }
          },
          cancelled: {
            $sum: { $cond: [{ $eq: ["$status", "لغو شده"] }, 1, 0] }
          }
        }
      }
    ]);

    // اگر دیتایی وجود نداشت (اولین بار)
    const data = stats.length > 0 ? stats[0] : { total: 0, confirmed: 0, pending: 0, cancelled: 0 };

    res.status(200).json({
      success: true,
      data: {
        total: data.total,
        confirmed: data.confirmed,
        pending: data.pending,
        cancelled: data.cancelled
      }
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ success: false, error: "خطا در دریافت آمار" });
  }
}
