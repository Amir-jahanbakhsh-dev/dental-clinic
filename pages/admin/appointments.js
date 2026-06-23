// pages/admin/PatientsPage.js
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout'; // فرض می‌کنیم این کامپوننت Layout شماست
import Swal from 'sweetalert2'; // برای نمایش هشدارهای تعاملی

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // تابع برای دریافت لیست بیماران از API
  const fetchPatients = async () => {
    setLoading(true); // شروع بارگذاری
    try {
      const res = await fetch("/api/admin/users", { method: "GET" }); // فرض می‌کنیم API دریافت لیست کاربران در این مسیر است
      const data = await res.json();

      if (res.ok) {
        setPatients(data.users || []); // به‌روزرسانی لیست بیماران
      } else {
        // نمایش خطا در صورت عدم موفقیت دریافت لیست
        Swal.fire({
          icon: "error",
          title: "خطا در دریافت لیست",
          text: data.message || "خطا در دریافت اطلاعات بیماران.",
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      // نمایش خطای شبکه
      Swal.fire({
        icon: "error",
        title: "خطای شبکه",
        text: "اتصال به سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی کنید.",
      });
    } finally {
      setLoading(false); // پایان بارگذاری
    }
  };

  // فراخوانی fetchPatients هنگام بارگذاری اولیه صفحه
  useEffect(() => {
    fetchPatients();
  }, []);

  // تابع برای نمایش جزئیات بیمار با SweetAlert2
  const handleViewPatient = (patient) => {
    Swal.fire({
      title: `جزئیات بیمار: ${patient.name}`,
      html: `
                <div dir="rtl" class="text-left p-4">
                    <p class="mb-2 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <strong>نام:</strong> ${patient.name}
                    </p>
                    <p class="mb-2 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <strong>کد ملی:</strong> ${patient.nationalId || '-'}
                    </p>
                    <p class="mb-2 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <strong>شماره تماس:</strong> ${patient.phone || '-'}
                    </p>
                    <p class="mb-2 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <strong>آخرین مراجعه:</strong> ${patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString('fa-IR') : '-'}
                    </p>
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <strong>وضعیت:</strong> 
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${patient.status === "فعال" ? "bg-green-100 text-green-700" :
          patient.status === "در انتظار" ? "bg-yellow-100 text-yellow-700" :
            "bg-red-100 text-red-700"}">
                            ${patient.status || "نامشخص"}
                        </span>
                    </p>
                </div>
            `,
      icon: "info",
      confirmButtonText: "بستن",
      customClass: {
        popup: 'rounded-lg shadow-xl',
        title: 'text-xl font-bold text-gray-800',
        htmlContainer: 'text-sm',
        confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md'
      }
    });
  };

  // تابع برای حذف بیمار با تأیید SweetAlert2 و فراخوانی API
  const handleDeletePatient = async (patientId, patientName) => {
    // نمایش پنجره تأیید حذف
    const result = await Swal.fire({
      title: `آیا از حذف بیمار "${patientName}" مطمئن هستید؟`,
      text: "این عمل غیرقابل بازگشت است!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // رنگ دکمه تایید قرمز
      cancelButtonColor: "#3085d6", // رنگ دکمه لغو آبی
      confirmButtonText: "بله، حذف شود",
      cancelButtonText: "انصراف",
      reverseButtons: true // دکمه ها در راستای RTL به این شکل نمایش داده می شوند
    });

    // اگر کاربر روی دکمه "بله، حذف شود" کلیک کرد
    if (result.isConfirmed) {
      try {
        // فراخوانی API حذف با متد DELETE
        const response = await fetch(`/api/admin/users/${patientId}`, {
          method: "DELETE",
        });
        const data = await response.json(); // دریافت پاسخ از API

        if (response.ok) {
          // نمایش پیام موفقیت‌آمیز
          Swal.fire({
            title: "موفقیت‌آمیز!",
            text: data.message || "بیمار با موفقیت حذف شد.",
            icon: "success",
            confirmButtonText: "باشه",
            customClass: {
              confirmButton: 'bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md'
            }
          });
          // بازخوانی لیست بیماران برای نمایش تغییرات
          fetchPatients();
        } else {
          // نمایش پیام خطا در صورت عدم موفقیت حذف
          Swal.fire({
            title: "خطا در حذف",
            text: data.message || "خطا در حذف بیمار. لطفاً دوباره امتحان کنید.",
            icon: "error",
            confirmButtonText: "باشه",
            customClass: {
              confirmButton: 'bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md'
            }
          });
        }
      } catch (error) {
        // نمایش خطای شبکه در صورت بروز مشکل در ارتباط
        console.error("Delete error:", error);
        Swal.fire({
          title: "خطای شبکه",
          text: "اتصال به سرور برقرار نشد. لطفاً وضعیت اینترنت خود را بررسی کنید.",
          icon: "error",
          confirmButtonText: "باشه",
          customClass: {
            confirmButton: 'bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md'
          }
        });
      }
    }
  };

  // محاسبه تعداد کل بیماران و بیماران فعال برای نمایش در داشبورد
  const totalPatients = patients.length;
  const activePatients = patients.filter(p => p.status === "فعال").length;
  // const monthlyVisits = ... (اگر نیاز باشد، منطق محاسبه ویزیت ماهانه را اینجا اضافه کنید)

  return (
    // استفاده از Layout مدیریت
    <AdminLayout>
      <div className="space-y-6" dir="rtl"> {/* dir="rtl" برای راست‌چین شدن کل صفحه */}

        {/* بخش عنوان و جستجو */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                مدیریت بیماران
              </h1>
              <p className="text-slate-500 mt-1">
                مشاهده، جستجو و مدیریت اطلاعات تمامی بیماران
              </p>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="جستجوی بیمار..."
                className="w-full md:w-72 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              // TODO: پیاده‌سازی قابلیت جستجو بر اساس ورودی
              />
              <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 transition font-medium">
                افزودن بیمار
                {/* TODO: پیاده‌سازی دکمه افزودن بیمار */}
              </button>
            </div>
          </div>
        </div>

        {/* بخش آمارهای کلیدی (داشبورد کوچک) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-600 text-white rounded-2xl p-5 shadow-lg flex flex-col justify-center items-center">
            <p className="text-sm opacity-90">کل بیماران</p>
            <h2 className="text-4xl font-bold mt-2">{totalPatients}</h2>
          </div>
          <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-lg flex flex-col justify-center items-center">
            <p className="text-sm text-slate-500">بیماران فعال</p>
            <h2 className="text-4xl font-bold text-slate-800 mt-2">{activePatients}</h2>
          </div>
          <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-lg flex flex-col justify-center items-center">
            <p className="text-sm text-slate-500">ویزیت این ماه</p>
            <h2 className="text-4xl font-bold text-slate-800 mt-2">?</h2>
            {/* TODO: پیاده‌سازی نمایش تعداد ویزیت ماهانه */}
          </div>
        </div>

        {/* جدول نمایش لیست بیماران */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-800">لیست بیماران</h2>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-10 text-center text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p>در حال بارگذاری لیست بیماران...</p>
              </div>
            ) : patients.length === 0 ? (
              <p className="p-10 text-center text-gray-500">هنوز هیچ بیماری ثبت نشده است.</p>
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
                    <tr
                      key={patient._id}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                        {patient.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {patient.nationalId || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {patient.phone || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {patient.lastVisit
                          ? new Date(patient.lastVisit).toLocaleDateString("fa-IR")
                          : "-"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${patient.status === "فعال"
                              ? "bg-green-100 text-green-700"
                              : patient.status === "در انتظار"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                        >
                          {patient.status || "نامشخص"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleViewPatient(patient)}
                            className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-200"
                          >
                            مشاهده
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePatient(patient._id, patient.name)}
                            className="rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-600 hover:bg-red-100"
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
    </AdminLayout >
  );
}
