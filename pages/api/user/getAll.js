import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await dbConnect();

  try {
    // . دریافت تمام کاربران
    // .select('-password') باعث می‌شود فیلد password از نتیجه حذف شود
    const users = await User.find({}).select('-password');

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {
    console.error('Get All Users Error:', error);
    return res.status(500).json({ message: 'خطای سرور در دریافت لیست کاربران' });
  }
}
