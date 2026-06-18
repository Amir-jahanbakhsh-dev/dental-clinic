import dbConnect from '@/lib/mongodb';
import Doctor from '@/models/Doctor';

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case 'GET': // دریافت لیست پزشکان
      try {
        const doctors = await Doctor.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: doctors });
      } catch (error) {
        res.status(400).json({ success: false, error: 'خطا در دریافت اطلاعات' });
      }
      break;

    case 'POST': // افزودن پزشک جدید
      try {
        const doctor = await Doctor.create(req.body);
        res.status(201).json({ success: true, data: doctor });
      } catch (error) {
        res.status(400).json({ success: false, error: 'خطا در ثبت پزشک' });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'متد مجاز نیست' });
      break;
  }
}
