"use client";
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Modal from '@/components/admin/modal';
import Swal from 'sweetalert2';

const emptyForm = {
    title: "",
    slug: "",
    summary: "",
    content: "",
    image: "",
    author: "",
    category: "",
    status: "پیش‌نویس",
};

const ArtManeger = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            setIsLoading(true);
            const res = await fetch('/api/articles');
            const result = await res.json();
            if (result.success) setArticles(result.data);
            else Swal.fire("خطا", result.message, "error");
        } catch (error) {
            Swal.fire("خطا", "خطای شبکه در دریافت مقالات", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // تبدیل خودکار عنوان به اسلاگ ساده در صورت خالی بودن اسلاگ
    const handleTitleChange = (e) => {
        const title = e.target.value;
        setFormData((prev) => ({
            ...prev,
            title,
            slug: prev.slug ? prev.slug : title.trim().replace(/\s+/g, "-"),
        }));
    };

    // --- ساخت مقاله جدید: قبلاً این فرم به هیچ API متصل نبود، اکنون واقعاً ذخیره می‌کند ---
    const handleCreateArticle = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await res.json();
            if (result.success) {
                Swal.fire("موفقیت", result.message, "success");
                setIsModalOpen(false);
                setFormData(emptyForm);
                fetchArticles();
            } else {
                Swal.fire("خطا", result.message, "error");
            }
        } catch (error) {
            Swal.fire("خطا", "خطای سرور در ثبت مقاله", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = async (article) => {
        const { value: formValues } = await Swal.fire({
            title: 'ویرایش مقاله',
            html: `
                <div dir="rtl" style="text-align: right; font-family: Tahoma;">
                    <label class="block mb-1 text-sm">عنوان مقاله:</label>
                    <input id="swal-title" class="swal2-input" value="${article.title.replace(/"/g, '&quot;')}" style="width: 85%; margin: 8px auto;">

                    <label class="block mb-1 text-sm">نویسنده:</label>
                    <input id="swal-author" class="swal2-input" value="${(article.author || '').replace(/"/g, '&quot;')}" style="width: 85%; margin: 8px auto;">

                    <label class="block mb-1 text-sm">خلاصه:</label>
                    <input id="swal-summary" class="swal2-input" value="${(article.summary || '').replace(/"/g, '&quot;')}" style="width: 85%; margin: 8px auto;">

                    <label class="block mb-1 text-sm">وضعیت:</label>
                    <select id="swal-status" class="swal2-input" style="width: 85%; margin: 8px auto;">
                        <option value="پیش‌نویس" ${article.status === 'پیش‌نویس' ? 'selected' : ''}>پیش‌نویس</option>
                        <option value="منتشر شده" ${article.status === 'منتشر شده' ? 'selected' : ''}>منتشر شده</option>
                    </select>
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'ذخیره تغییرات',
            cancelButtonText: 'انصراف',
            preConfirm: () => ({
                title: document.getElementById('swal-title').value,
                author: document.getElementById('swal-author').value,
                summary: document.getElementById('swal-summary').value,
                status: document.getElementById('swal-status').value,
            }),
        });

        if (formValues) {
            try {
                const res = await fetch(`/api/articles/${article._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formValues),
                });
                const result = await res.json();
                if (result.success) {
                    Swal.fire("موفقیت", "مقاله با موفقیت ویرایش شد", "success");
                    fetchArticles();
                } else {
                    Swal.fire("خطا", result.message, "error");
                }
            } catch (error) {
                Swal.fire("خطا", "خطای سرور در ویرایش مقاله", "error");
            }
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'آیا مطمئن هستید؟',
            text: "این مقاله برای همیشه حذف خواهد شد!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'بله، حذف شود',
            cancelButtonText: 'انصراف',
        });

        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
                const result = await res.json();
                if (result.success) {
                    Swal.fire("حذف شد!", result.message, "success");
                    fetchArticles();
                } else {
                    Swal.fire("خطا", result.message, "error");
                }
            } catch (error) {
                Swal.fire("خطا", "خطای شبکه در حذف مقاله", "error");
            }
        }
    };

    return (
        <AdminLayout>
            <div dir="rtl" className="p-6 bg-gray-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-800">مدیریت مقالات</h1>
                    <button
                        onClick={() => { setFormData(emptyForm); setIsModalOpen(true); }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        افزودن مقاله جدید
                    </button>
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="افزودن مقاله جدید">
                    <form onSubmit={handleCreateArticle} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">عنوان مقاله</label>
                            <input
                                required
                                name="title"
                                value={formData.title}
                                onChange={handleTitleChange}
                                type="text"
                                placeholder="عنوان مقاله"
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Slug (آدرس صفحه)</label>
                            <input
                                required
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                type="text"
                                placeholder="مثلاً: care-of-teeth"
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">نویسنده</label>
                            <input
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                type="text"
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">لینک تصویر (اختیاری)</label>
                            <input
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">خلاصه مقاله</label>
                            <input
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                type="text"
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">متن مقاله</label>
                            <textarea
                                required
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="متن مقاله"
                                className="w-full p-2 border rounded h-32"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">وضعیت</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="پیش‌نویس">پیش‌نویس</option>
                                <option value="منتشر شده">منتشر شده</option>
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
                                disabled={isSubmitting}
                                className={`flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 ${isSubmitting ? 'opacity-50' : ''}`}
                            >
                                {isSubmitting ? 'در حال ذخیره...' : 'ذخیره'}
                            </button>
                        </div>
                    </form>
                </Modal>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {isLoading ? (
                        <div className="text-center py-10 text-gray-500">در حال بارگذاری...</div>
                    ) : (
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
                                {articles.length > 0 ? (
                                    articles.map((art) => (
                                        <tr key={art._id} className="border-t hover:bg-gray-50">
                                            <td className="p-4">{art.title}</td>
                                            <td className="p-4">{art.author || '—'}</td>
                                            <td className="p-4">
                                                {new Date(art.createdAt).toLocaleDateString('fa-IR')}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${art.status === 'منتشر شده' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    {art.status}
                                                </span>
                                            </td>
                                            <td className="p-4 space-x-2 space-x-reverse">
                                                <button onClick={() => handleEdit(art)} className="text-blue-600 hover:underline">ویرایش</button>
                                                <button onClick={() => handleDelete(art._id)} className="text-red-600 hover:underline">حذف</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">
                                            هیچ مقاله‌ای ثبت نشده است. اولین مقاله خود را اضافه کنید.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

export default ArtManeger;
