"use client";
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';
import Modal from '@/components/admin/modal';
const ServManeger = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const services = [
        { id: 1, name: "ویزیت عمومی", price: "۲۰۰,۰۰۰ تومان", duration: "۲۰ دقیقه" },
        { id: 2, name: "لیزر درمانی", price: "۸۰۰,۰۰۰ تومان", duration: "۴۵ دقیقه" },
        { id: 3, name: "فیزیوتراپی", price: "۴۰۰,۰۰۰ تومان", duration: "۳۰ دقیقه" },
    ];
    return (
        <AdminLayout>
            <div dir="rtl" className="p-6 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-bold mb-6 text-blue-800">مدیریت خدمات</h1>

                <div className="mb-6">
                    <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">تعریف سرویس جدید</button>
                </div>
                {/* مودال ثبت سرویس */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="افزودن سرویس جدید"
                >
                    <form className="space-y-1 ">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                نام سرویس
                            </label>
                            <input
                                type="text"
                                placeholder="مثلاً: مشاوره تخصصی پوست"
                                className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                قیمت
                            </label>
                            <input
                                type="number"
                                placeholder="مثلاً: 500000"
                                className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                مدت زمان تقریبی
                            </label>
                            <input
                                type="text"
                                placeholder="مثلاً: ۳۰ دقیقه"
                                className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                توضیحات سرویس
                            </label>
                            <textarea
                                placeholder="توضیح کوتاهی درباره این سرویس بنویسید..."
                                className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                وضعیت سرویس
                            </label>
                            <select className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="active">فعال</option>
                                <option value="inactive">غیرفعال</option>
                            </select>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                            >
                                انصراف
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                            >
                                ذخیره سرویس
                            </button>
                        </div>
                    </form>
                </Modal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white p-5 rounded-lg shadow border-r-4 border-blue-500">
                            <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                            <p className="text-gray-600 mb-1">هزینه: {service.price}</p>
                            <p className="text-gray-600 mb-4">زمان تقریبی: {service.duration}</p>
                            <div className="flex gap-2">
                                <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200">ویرایش</button>
                                <button className="flex-1 bg-red-50 text-red-600 py-2 rounded hover:bg-red-100">حذف</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}

export default ServManeger;
