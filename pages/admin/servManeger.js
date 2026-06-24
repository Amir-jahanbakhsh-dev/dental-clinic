"use client";
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Modal from '@/components/admin/modal';
import Swal from 'sweetalert2';

const ServManeger = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        shortDescription: "",
        image: "",
        price: 0,
        category: "",
        isActive: true,
        order: 0,
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setIsLoading(true);
            const res = await fetch('/api/services');
            const result = await res.json();
            if (result.success) setServices(result.data);
            else Swal.fire("خطا", result.message, "error");
        } catch (error) {
            Swal.fire("خطا", "خطای شبکه", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    // --- تابع ویرایش با استفاده از SweetAlert2 ---
    const handleEdit = async (service) => {
        const { value: formValues } = await Swal.fire({
            title: 'ویرایش سرویس',
            html: `
                <div dir="rtl" style="text-align: right; font-family: Tahoma;">
                    <label class="block mb-1 text-sm">نام سرویس:</label>
                    <input id="swal-title" class="swal2-input" value="${service.title}" style="width: 80%; margin: 10px auto;">
                    
                    <label class="block mb-1 text-sm">قیمت (تومان):</label>
                    <input id="swal-price" type="number" class="swal2-input" value="${service.price}" style="width: 80%; margin: 10px auto;">
                    
                    <label class="block mb-1 text-sm">توضیحات کوتاه:</label>
                    <input id="swal-shortDesc" class="swal2-input" value="${service.shortDescription || ''}" style="width: 80%; margin: 10px auto;">

                    <label class="block mb-1 text-sm">لینک تصویر:</label>
                    <input id="swal-image" class="swal2-input" value="${service.image}" style="width: 80%; margin: 10px auto;">
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'ذخیره تغییرات',
            cancelButtonText: 'انصراف',
            preConfirm: () => {
                return {
                    title: document.getElementById('swal-title').value,
                    price: parseFloat(document.getElementById('swal-price').value),
                    shortDescription: document.getElementById('swal-shortDesc').value,
                    image: document.getElementById('swal-image').value,
                }
            }
        });

        // اگر کاربر تایید کرد و اطلاعاتی وارد کرد
        if (formValues) {
            try {
                const res = await fetch(`/api/services/${service._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formValues),
                });

                const result = await res.json();

                if (result.success) {
                    Swal.fire("موفقیت", "سرویس با موفقیت ویرایش شد", "success");
                    fetchServices();
                } else {
                    Swal.fire("خطا", result.message, "error");
                }
            } catch (error) {
                Swal.fire("خطا", "خطای سرور در ویرایش", "error");
            }
        }
    };

    const handleCreateService = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await res.json();
            if (result.success) {
                Swal.fire("موفقیت", result.message, "success");
                setIsModalOpen(false);
                setFormData({ title: "", slug: "", description: "", shortDescription: "", image: "", price: 0, category: "", isActive: true, order: 0 });
                fetchServices();
            } else {
                Swal.fire("خطا", result.message, "error");
            }
        } catch (error) {
            Swal.fire("خطا", "خطای سرور", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'آیا مطمئن هستید؟',
            text: "این سرویس حذف خواهد شد!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'بله، حذف شود',
            cancelButtonText: 'انصراف'
        });

        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
                const result = await res.json();
                if (result.success) {
                    Swal.fire("حذف شد!", result.message, "success");
                    fetchServices();
                } else {
                    Swal.fire("خطا", result.message, "error");
                }
            } catch (error) {
                Swal.fire("خطا", "خطای شبکه", "error");
            }
        }
    };

    return (
        <AdminLayout>
            <div dir="rtl" className="p-6 bg-gray-50 min-h-screen text-right">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-800">مدیریت خدمات</h1>
                    <button 
                        onClick={() => setIsModalOpen(true)} 
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        + تعریف سرویس جدید
                    </button>
                </div>

                {/* مودال ثبت سرویس */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="افزودن سرویس جدید"
                >
                    <form onSubmit={handleCreateService} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">نام سرویس</label>
                            <input
                                required
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                type="text"
                                placeholder="مثلاً: مشاوره تخصصی پوست"
                                className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Slug (آدرس کوتاه)</label>
                            <input
                                required
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                type="text"
                                placeholder="masalah-pust"
                                className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">قیمت (تومان)</label>
                                <input
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    type="number"
                                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">ترتیب نمایش</label>
                                <input
                                    name="order"
                                    value={formData.order}
                                    onChange={handleChange}
                                    type="number"
                                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">لینک تصویر (URL)</label>
                            <input
                                required
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">توضیحات کوتاه</label>
                            <input
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleChange}
                                type="text"
                                className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">توضیحات کامل</label>
                            <textarea
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">وضعیت فعال بودن</label>
                            <select 
                                name="isActive"
                                value={formData.isActive}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={true}>فعال</option>
                                <option value={false}>غیرفعال</option>
                            </select>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                انصراف
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors ${isSubmitting ? 'opacity-50' : ''}`}
                            >
                                {isSubmitting ? 'در حال ذخیره...' : 'ذخیره سرویس'}
                            </button>
                        </div>
                    </form>
                </Modal>

                {/* لیست سرویس‌ها */}
                {isLoading ? (
                    <div className="text-center py-10">در حال بارگذاری...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.length > 0 ? (
                            services.map((service) => (
                                <div key={service._id} className="bg-white p-5 rounded-lg shadow border-r-4 border-blue-500 relative group">
                                    <div className="flex justify-between items-start mb-3">
                                        <h2 className="text-xl font-semibold text-gray-800">{service.title}</h2>
                                        <span className={`text-xs px-2 py-1 rounded ${service.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {service.isActive ? 'فعال' : 'غیرفعال'}
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <p>💰 هزینه: <span className="font-medium text-gray-900">{service.price.toLocaleString()} تومان</span></p>
                                        <p>📝 دسته: <span className="font-medium text-gray-900">{service.category || 'بدون دسته'}</span></p>
                                    </div>

                                    <div className="flex gap-2 mt-5 pt-4 border-t">
                                        <button 
                                            onClick={() => handleEdit(service._id)}
                                            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        >
                                            ویرایش
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(service._id)}
                                            className="flex-1 bg-red-50 text-red-600 py-2 rounded hover:bg-red-600 hover:text-white transition-all"
                                        >
                                            حذف
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                هیچ سرویسی یافت نشد. اولین سرویس خود را تعریف کنید.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

export default ServManeger;

