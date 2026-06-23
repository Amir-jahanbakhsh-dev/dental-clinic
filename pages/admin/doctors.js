import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Swal from "sweetalert2";
import Image from "next/image"; // برای نمایش پیش‌نمایش در جدول

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDoctors = async () => {
        try {
            const res = await fetch('/api/admin/doctors');
            const result = await res.json();
            if (result.success) {
                setDoctors(result.data);
            } else {
                setDoctors([]);
            }
        } catch (error) {
            console.error(error);
            setDoctors([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDoctors(); }, []);

    const handleDelete = async (id, name) => {
        const result = await Swal.fire({
            title: `حذف دکتر ${name}?`,
            text: "این عملیات غیرقابل بازگشت است",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'بله، حذف شود',
            cancelButtonText: 'انصراف'
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`/api/admin/doctors/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    fetchDoctors();
                    Swal.fire('حذف شد!', '', 'success');
                } else {
                    throw new Error();
                }
            } catch (err) {
                Swal.fire('خطا', 'خطا در حذف پزشک', 'error');
            }
        }
    };

    const handleAddDoctor = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'افزودن پزشک جدید',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="نام پزشک">' +
                '<input id="swal-input2" class="swal2-input" placeholder="تخصص">' +
                '<input id="swal-input3" class="swal2-input" placeholder="کد نظام پزشکی">' +
                '<input id="swal-input4" class="swal2-input" placeholder="شماره تماس">' +
                '<input id="swal-input5" class="swal2-input" placeholder="لینک عکس پزشک (URL)">', // <--- فیلد جدید
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'ثبت پزشک',
            cancelButtonText: 'انصراف',
            preConfirm: () => {
                return {
                    name: document.getElementById('swal-input1').value,
                    specialty: document.getElementById('swal-input2').value,
                    medicalCode: document.getElementById('swal-input3').value,
                    phone: document.getElementById('swal-input4').value,
                    image: document.getElementById('swal-input5').value // <--- گرفتن مقدار لینک
                };
            }
        });

        if (formValues) {
            if (!formValues.name || !formValues.specialty || !formValues.medicalCode) {
                Swal.fire('خطا', 'نام، تخصص و کد نظام پزشکی الزامی هستند', 'error');
                return;
            }

            try {
                const res = await fetch('/api/admin/doctors', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formValues)
                });

                const data = await res.json();

                if (data.success) {
                    Swal.fire('موفقیت‌آمیز!', 'پزشک با موفقیت اضافه شد', 'success');
                    fetchDoctors(); 
                } else {
                    Swal.fire('خطا', data.error || 'مشکلی پیش آمد', 'error');
                }
            } catch (error) {
                Swal.fire('خطا', 'ارتباط با سرور برقرار نشد', 'error');
            }
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6" dir="rtl">
                <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-slate-800">مدیریت پزشکان</h1>
                        <button 
                            onClick={handleAddDoctor} 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all"
                        >
                            افزودن پزشک جدید
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
                    <table className="w-full text-right">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">عکس</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">نام پزشک</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">تخصص</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">کد نظام پزشکی</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="text-center py-10 text-gray-500">در حال بارگذاری...</td></tr>
                            ) : doctors && doctors.length > 0 ? (
                                doctors.map((doc) => (
                                    <tr key={doc._id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                                                <Image 
                                                    src={doc.image || "/img/default-doctor.png"} 
                                                    alt={doc.name} 
                                                    fill 
                                                    className="object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-800">{doc.name}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{doc.specialty}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{doc.medicalCode}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <button 
                                                onClick={() => handleDelete(doc._id, doc.name)} 
                                                className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
                                            >
                                                حذف
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-gray-500">
                                        لیست پزشکان خالی است.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
