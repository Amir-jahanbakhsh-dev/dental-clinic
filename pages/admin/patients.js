import React, { useEffect, useState } from 'react'; // useState و useEffect را اضافه کنید
import AdminLayout from '@/components/admin/AdminLayout';
import Swal from 'sweetalert2'; // برای نمایش پیام خطا

export default function PatientsPage() {
    // const patients = [...] // آرایه ثابت را حذف می‌کنیم

    const [patients, setPatients] = useState([]); // وضعیت برای نگهداری لیست بیماران
    const [loading, setLoading] = useState(true); // وضعیت برای نمایش پیام "در حال بارگذاری"


    const handleDeleteUser = async (id) => {
        const result = await Swal.fire({
            title: "حذف کاربر",
            text: "آیا از حذف این کاربر اطمینان دارید؟ این عمل غیرقابل بازگشت است!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "بله، حذف شود",
            cancelButtonText: "انصراف",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`/api/admin/users/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            console.log(data);


            if (data.success) {
                Swal.fire("حذف شد!", data.message, "success");
                fetchPatients()
            } else {
                Swal.fire("خطا", data.message, "error");
            }
        } catch (error) {
            Swal.fire("خطا", "خطای شبکه", "error");
        }
    };
    const viewUserDetail = async (id) => {
        try {
            const res = await fetch(`/api/user/${id}`, {
                method: "GET",
            });
            const data = await res.json();
            console.log(data.data);

            if (data.success) {
                Swal.fire({
                    title: "<span style='font-size: 1.5rem;'>اطلاعات پروفایل کاربر</span>",
                    html: `
    <div style="text-align: right; direction: rtl; font-family: Tahoma, Arial; line-height: 2;">
      <p><strong>👤 نام کاربر:</strong> ${data.data.name || 'ثبت نشده'}</p>
      <p><strong>📧 ایمیل:</strong> ${data.data.email || 'ثبت نشده'}</p>
      <p><strong>📱 تلفن:</strong> ${data.data.phone || 'موبایل وارد نشده'}</p>
      <p><strong>🆔 کد ملی:</strong> ${data.data.nationalId || 'کد ملی وارد نشده'}</p>
      </p>
    </div>
  `,
                    icon: "info", // یا "success" بسته به نیاز شما
                    confirmButtonText: "بستن",
                    confirmButtonColor: "#16a34a",
                    customClass: {
                        popup: 'my-swal-popup' // اگر می‌خواهید استایل خاصی بدهید
                    }
                });


            } else {
                Swal.fire("خطا", data.message, "error");
            }
        } catch (error) {
            Swal.fire("خطا", "ارتباط با سرور برقرار نشد", "error");
        }
    };

    // تابع برای دریافت اطلاعات بیماران از API
    const fetchPatients = async () => {
        try {
            const res = await fetch("/api/admin/users", { // آدرس API جدید
                method: "GET",
            });

            const data = await res.json();

            if (res.ok) {
                // اگر موفق بود، لیست بیماران را در state ذخیره کن
                setPatients(data.users || []);
            } else {
                // اگر خطا بود، پیام خطا را نمایش بده
                Swal.fire({
                    icon: "error",
                    title: "خطا",
                    text: data.message || "خطا در دریافت لیست بیماران.",
                });
            }
        } catch (error) {
            console.error("Fetch error:", error);
            Swal.fire({
                icon: "error",
                title: "خطای شبکه",
                text: "اتصال به سرور برقرار نشد.",
            });
        } finally {
            setLoading(false); // بعد از اتمام درخواست، وضعیت loading را false کن
        }
    };

    // useEffect برای اجرای تابع fetchPatients بعد از اولین رندر صفحه
    useEffect(() => {
        fetchPatients();
    }, []); // [] یعنی فقط یک بار بعد از mount شدن کامپوننت اجرا شود

    // محاسبه تعداد بیماران و بیماران فعال (می‌تواند از API هم بیاید)
    const totalPatients = patients.length;
    const activePatients = patients.filter(p => p.status === "فعال").length;
    const monthlyVisits = patients.filter(p => p.lastVisit >= new Date().toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })).length; // این قسمت نیاز به منطق دقیق‌تری دارد

    return (
        <AdminLayout>
            <div className="space-y-6" dir="rtl">
                <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                                مدیریت بیماران
                            </h1>
                            <p className="text-slate-500 mt-1">
                                مشاهده، جستجو و مدیریت اطلاعات بیماران
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="جستجوی بیمار..."
                                className="w-full md:w-72 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 transition">
                                افزودن بیمار
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-600 text-white rounded-2xl p-5 shadow-sm">
                        <p className="text-sm opacity-90">کل بیماران</p>
                        <h2 className="text-3xl font-bold mt-2">{totalPatients}</h2> {/* نمایش تعداد کل بیماران */}
                    </div>
                    <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
                        <p className="text-sm text-slate-500">بیماران فعال</p>
                        <h2 className="text-3xl font-bold text-slate-800 mt-2">{activePatients}</h2> {/* نمایش تعداد بیماران فعال */}
                    </div>
                    <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
                        <p className="text-sm text-slate-500">ویزیت این ماه</p>
                        <h2 className="text-3xl font-bold text-slate-800 mt-2">?</h2> {/* این قسمت نیاز به منطق بیشتر دارد */}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="text-lg font-semibold text-slate-800">لیست بیماران</h2>
                    </div>

                    <div className="overflow-x-auto">
                        {loading ? (
                            <p className="p-5 text-center text-gray-500">در حال بارگذاری لیست بیماران...</p>
                        ) : patients.length === 0 ? (
                            <p className="p-5 text-center text-gray-500">هنوز هیچ بیماری ثبت نشده است.</p>
                        ) : (
                            <table className="w-full text-right">
                                <thead className="bg-blue-50">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">نام بیمار</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">کد ملی</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">شماره تماس</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">آخرین مراجعه</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">وضعیت</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patients.map((patient) => (
                                        <tr key={patient._id} className="border-t border-slate-100 hover:bg-slate-50"> {/* از _id برای key استفاده کنید */}
                                            <td className="px-6 py-4 text-sm text-slate-800 font-medium">{patient.name}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{patient.nationalId || "-"}</td> {/* نمایش - در صورت خالی بودن */}
                                            <td className="px-6 py-4 text-sm text-slate-600">{patient.phone}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {patient.lastVisit
                                                    ? new Date(patient.lastVisit).toLocaleDateString('fa-IR')
                                                    : "-"} {/* تاریخ شمسی */}
                                            </td>
                                            <td className="px-6 py-4">

                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => viewUserDetail(patient._id)}
                                                        className="text-blue-600 hover:text-blue-900 font-medium"
                                                    >
                                                        مشاهده
                                                    </button>

                                                    {/* دکمه حذف */}
                                                    <button
                                                        onClick={() => handleDeleteUser(patient._id)}
                                                        className="text-red-600 hover:text-red-900 font-medium"
                                                    >
                                                        حذف
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
