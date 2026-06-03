import Footer from '@/components/footer/footer';
import Header from '@/components/navbar/navbar';
import React from 'react';

const UserPanel = () => {
    // اطلاعات نمونه کاربر
    const user = {
        name: 'مریم محمدی',
        appointments: [
            { id: 1, service: 'ایمپلنت', doctor: 'دکتر احمدی', date: '۱۴۰۳/۰۳/۲۰', time: '۱۰:۳۰', status: 'تأیید شده' },
            { id: 2, service: 'جرم‌گیری', doctor: 'دکتر نیکو', date: '۱۴۰۳/۰۴/۰۵', time: '۱۴:۰۰', status: 'در انتظار' },
        ]
    };

    return (
        <>
            <Header/>
            <div className="min-h-screen bg-gray-50 p-4 md:p-8 pt-30" dir="rtl">
                {/* هدر پنل کاربر */}
                <header className="max-w-4xl mx-auto flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold">سلام، {user.name} 👋</h1>
                        <p className="text-gray-500 text-sm">به پنل کاربری خود خوش آمدید</p>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition">
                        + نوبت جدید
                    </button>
                    <button className="text-red-500 font-semibold py-2 hover:bg-red-50 rounded">خروج از حساب</button>
                </header>

                {/* لیست نوبت‌ها */}
                <section className="max-w-4xl mx-auto">
                    <h2 className="text-lg font-bold mb-4">نوبت‌های من</h2>

                    <div className="space-y-4">
                        {user.appointments.map((app) => (
                            <div key={app.id} className="bg-white p-6 rounded-2xl shadow-sm flex flex-wrap justify-between items-center gap-4 hover:border-blue-200 border border-transparent transition">
                                <div>
                                    <h3 className="font-bold text-lg">{app.service}</h3>
                                    <p className="text-gray-500 text-sm">{app.doctor}</p>
                                </div>

                                <div className="flex gap-6 text-sm text-gray-600">
                                    <div className="text-center">
                                        <span className="block text-xs text-gray-400">تاریخ</span>
                                        {app.date}
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-xs text-gray-400">ساعت</span>
                                        {app.time}
                                    </div>
                                </div>

                                <div className={`px-4 py-1 rounded-full text-sm font-medium ${app.status === 'تأیید شده' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                                    }`}>
                                    {app.status}
                                </div>

                                <button className="text-gray-400 hover:text-red-500 transition">لغو نوبت</button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer/>
        </>
    );
};

export default UserPanel;
