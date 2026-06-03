"use client";
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useState  } from 'react';
import Modal from '@/components/admin/modal';
const ArtManeger = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const articles = [
        { id: 1, title: "راهکارهای نوین در درمان بیماری‌های قلبی", author: "دکتر احمدی", date: "۱۴۰۳/۰۳/۱۰", status: "منتشر شده" },
        { id: 2, title: "تغذیه مناسب در دوران بارداری", author: "دکتر رضایی", date: "۱۴۰۳/۰۳/۱۲", status: "پیش‌نویس" },
        { id: 3, title: "آشنایی با تکنولوژی‌های لیزر در پوست", author: "دکتر محمدی", date: "۱۴۰۳/۰۳/۱۵", status: "منتشر شده" },
    ];
    return (
        <AdminLayout>
            <div dir="rtl" className="p-6 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-bold mb-6 text-blue-800">مدیریت مقالات</h1>

                {/* دکمه افزودن */}
                <div className="mb-6">
                    <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">افزودن مقاله جدید</button>
                </div>
                {/* مودال شامل فرم */}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="افزودن مقاله جدید">
                    <form className="space-y-4">
                        <input type="text" placeholder="عنوان مقاله" className="w-full p-2 border rounded" />
                        <textarea placeholder="متن مقاله" className="w-full p-2 border rounded h-32"></textarea>
                        <button className="bg-blue-600 text-white w-full py-2 rounded">ذخیره</button>
                    </form>
                </Modal>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-4">عنوان مقاله</th>
                                <th className="p-4">نویسنده</th>
                                <th className="p-4">تاریخ</th>
                                <th className="p-4">وضعیت</th>
                                <th className="p-4">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((art) => (
                                <tr key={art.id} className="border-t hover:bg-gray-50">
                                    <td className="p-4">{art.title}</td>
                                    <td className="p-4">{art.author}</td>
                                    <td className="p-4">{art.date}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${art.status === 'منتشر شده' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {art.status}
                                        </span>
                                    </td>
                                    <td className="p-4 space-x-2 space-x-reverse">
                                        <button className="text-blue-600 hover:underline">ویرایش</button>
                                        <button className="text-red-600 hover:underline">حذف</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}

export default ArtManeger;
