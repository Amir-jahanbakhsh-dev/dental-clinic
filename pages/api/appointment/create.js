import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import Appointment from '@/models/Appointment';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    await dbConnect();

    // ۱. احراز هویت
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'ابتدا باید وارد حساب کاربری خود شوید.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ۲. دریافت اطلاعات از بدنه درخواست
        const { fullName, phone, service, doctor, date, time, description } = req.body;

        // ۳. اعتبارسنجی ساده
        if (!fullName || !phone || !service || !doctor || !date || !time) {
            return res.status(400).json({ message: 'لطفاً تمام فیلدهای الزامی را پر کنید.' });
        }

        // ۴. ذخیره در دیتابیس
        const newAppointment = await Appointment.create({
            user: decoded.id, // اتصال به کاربر لاگین شده
            fullName,
            phone,
            service,
            doctor,
            date: new Date(date),
            time,
            description
        });

        return res.status(201).json({
            success: true,
            message: "نوبت با موفقیت ثبت شد",
            appointment: newAppointment
        });
    } catch (error) {
        res.status(403).json({ message: 'لطفاابتدا لاگین کنید سپس نوبت بگیرید' });
    }
}
