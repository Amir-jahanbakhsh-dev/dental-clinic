import dbConnect from '@/lib/mongodb'; 
import user from '@/models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await dbConnect();

  try {
    // 1. دریافت توکن از هدر Authorization
    // معمولاً به شکل "Bearer <token>" ارسال می‌شود
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'عدم وجود توکن یا فرمت اشتباه' });
    }

    const token = authHeader.split(' ')[1];

    // 2. تایید توکن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. پیدا کردن کاربر در دیتابیس بر اساس ID موجود در توکن
    const user = await User.findById(decoded.id).select('-password'); // حذف رمز عبور از خروجی

    if (!user) {
      return res.status(404).json({ message: 'کاربر یافت نشد' });
    }

    // 4. ارسال اطلاعات کاربر
    return res.status(200).json(user);

  } catch (error) {
    console.error('Get Profile Error:', error);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'توکن نامعتبر یا منقضی شده است' });
    }
    return res.status(500).json({ message: 'خطای سرور در دریافت اطلاعات' });
  }
}
