import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import crypto from 'crypto'; // برای ساخت توکن موقت
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'ایمیل الزامی است' });
  }

  await dbConnect();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // برای امنیت بیشتر، حتی اگر کاربر وجود نداشت هم بگوییم ایمیل ارسال شد
      // تا هکرها متوجه نشوند چه ایمیل‌هایی در سیستم شما ثبت شده است.
      return res.status(200).json({ message: 'اگر این ایمیل در سیستم باشد، لینک بازیابی ارسال می‌شود' });
    }

    // 1. ساخت یک توکن تصادفی و موقت برای بازیابی
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // 2. ذخیره توکن در دیتابیس (باید فیلد resetPasswordToken و resetPasswordExpires را به مدل User اضافه کنید)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // اعتبار ۱ ساعت (به میلی‌ثانیه)
    await user.save();

    // 3. تنظیمات ارسال ایمیل (باید اطلاعات SMTP خود را اینجا بگذارید)
    // فعلاً از سرویس‌های مثل Gmail یا Mailtrap استفاده می‌شود
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER, // ایمیل شما
        pass: process.env.EMAIL_PASS, // App Password گوگل
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: '"نام سایت شما" <noreply@yourdomain.com>',
      to: user.email,
      subject: 'درخواست بازیابی رمز عبور',
      html: `<h3>لینک بازیابی رمز عبور شما:</h3>
             <p>لطفاً روی لینک زیر کلیک کنید تا رمز خود را تغییر دهید:</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>این لینک ۱ ساعت اعتبار دارد.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'لینک بازیابی به ایمیل ارسال شد' });

  } catch (error) {
    console.error('Forgot Password Error:', error);
    return res.status(500).json({ message: 'خطای سرور در فرآیند بازیابی' });
  }
}
