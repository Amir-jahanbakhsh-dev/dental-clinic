import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Swal from "sweetalert2";

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDoctors = async () => {
        try {
            const res = await fetch('/api/admin/doctors');
            const result = await res.json();

            // دقت کنید: اگر API شما خروجی را داخل یک آبجکت مثل { data: [...] } می‌فرستد
            // حتما باید result.data را ست کنید، نه خودِ result را.
            if (result.success) {
                setDoctors(result.data);
            } else {
                setDoctors([]); // اگر خطا داشت، آرایه خالی قرار بده
            }
        } catch (error) {
            console.error(error);
            setDoctors([]); // در صورت خطای شبکه، آرایه خالی قرار بده
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
            await fetch(`/api/admin/doctors/${id}`, { method: 'DELETE' }).then(res => console.log(res));
            fetchDoctors();
            Swal.fire('حذف شد!', '', 'success');
        }
    };

    const handleAddDoctor = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'افزودن پزشک جدید',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="نام پزشک">' +
                '<input id="swal-input2" class="swal2-input" placeholder="تخصص">' +
                '<input id="swal-input3" class="swal2-input" placeholder="کد نظام پزشکی">' +
                '<input id="swal-input4" class="swal2-input" placeholder="شماره تماس">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'ثبت پزشک',
            cancelButtonText: 'انصراف',
            preConfirm: () => {
                return {
                    name: document.getElementById('swal-input1').value,
                    specialty: document.getElementById('swal-input2').value,
                    medicalCode: document.getElementById('swal-input3').value,
                    phone: document.getElementById('swal-input4').value
                };
            }
        });

        if (formValues) {
            // اعتبارسنجی ساده
            if (!formValues.name || !formValues.specialty) {
                Swal.fire('خطا', 'نام و تخصص الزامی هستند', 'error');
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
                    fetchDoctors(); // آپدیت کردن لیست در صفحه
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
                {/* بخش هدر و آمار */}
                <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">مدیریت پزشکان</h1>
                        <button onClick={handleAddDoctor} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl">افزودن پزشک</button>
                    </div>
                </div>

                {/* جدول پزشکان - بدون فاصله گذاری خطا دار */}
                <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
                    <table className="w-full text-right">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">نام پزشک</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">تخصص</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">کد نظام پزشکی</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors && doctors.length > 0 ? (
                                doctors.map((doc) => (
                                    <tr key={doc._id} className="border-t border-slate-100">
                                        <td className="px-6 py-4 text-sm">{doc.name}</td>
                                        <td className="px-6 py-4 text-sm">{doc.specialty}</td>
                                        <td className="px-6 py-4 text-sm">{doc.phone}</td>
                                        <td className="px-6 py-4 text-sm"><button onClick={() => handleDelete(doc._id, doc.name)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl">حذف پزشک</button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500">
                                        لیست پزشکان خالی است یا در حال بارگذاری...
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
