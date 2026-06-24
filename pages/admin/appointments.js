import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Swal from 'sweetalert2';
import Link from 'next/link';
export default function AppointmentsManagementPage() {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ total: 0, confirmed: 0, pending: 0, cancelled: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // دریافت همزمان لیست نوبت‌ها و آمار از سرور
  const fetchData = async () => {
    setLoading(true);
    try {
      const [appointmentsRes, statsRes] = await Promise.all([
        fetch('/api/admin/appointments'),
        fetch('/api/admin/stats')
      ]);

      const appointmentsData = await appointmentsRes.json();
      const statsData = await statsRes.json();

      console.log("Full API Response:", appointmentsData); // حتماً چک کنید این در کنسول بیاید

      if (appointmentsData.success && Array.isArray(appointmentsData.appointments)) {
        setAppointments(appointmentsData.appointments);
        console.log('nobatha successfully loaded:', appointmentsData.appointments);
      } else {
        console.error("Data is not an array or success is false");
        setAppointments([]);
      }

      if (statsData.success) {
        setStats(statsData.data || { total: 0, confirmed: 0, pending: 0, cancelled: 0 });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'آیا مطمئن هستید؟',
      text: "این نوبت از سیستم حذف خواهد شد",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'بله، حذف شود',
      cancelButtonText: 'انصراف'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/appointment/${id}`, { method: 'DELETE' });
        if (res.ok) {
          Swal.fire('حذف شد!', 'نوبت با موفقیت لغو شد.', 'success');
          fetchData(); // رفرش کردن لیست بعد از حذف
        }
      } catch (err) {
        Swal.fire('خطا', 'خطا در عملیات حذف', 'error');
      }
    }
  };
  const handleConfirm = async (id) => {
    // ۱. نمایش باکس تایید با SweetAlert
    const result = await Swal.fire({
      title: "تأیید نوبت",
      text: "آیا از تأیید این نوبت اطمینان دارید؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981", // سبز
      cancelButtonColor: "#d33",    // قرمز
      confirmButtonText: "بله، تأیید شود",
      cancelButtonText: "انصراف",
    });

    // ۲. اگر کاربر کنسل کرد، از تابع خارج شو
    if (!result.isConfirmed) return;

    try {
      // ۳. فراخوانی API که ساختیم
      const res = await fetch(`/api/appointment/${id}`, {
        method: 'PATCH',
      });

      const data = await res.json();

      if (data.success) {
        // ۴. نمایش پیام موفقیت و رفرش کردن لیست
        Swal.fire("انجام شد!", "نوبت با موفقیت تأیید شد.", "success");
        fetchData(); // این تابع همان تابعی است که لیست را از سرور می‌گیرد
      } else {
        Swal.fire("خطا!", data.message || "مشکلی پیش آمد", "error");
      }
    } catch (error) {
      console.error("Error confirming appointment:", error);
      Swal.fire("خطا!", "ارتباط با سرور برقرار نشد", "error");
    }
  };


  // فیلتر کردن لیست بر اساس جستجو (در سمت کلاینت برای سرعت بالا)
  const filteredAppointments = appointments?.filter(app => {
    const search = searchTerm.toLowerCase().trim();
    if (!search) return true;
    const pName = app.fullName ? String(app.fullName).toLowerCase() : "";
    const serviceName = app.service ? String(app.service).toLowerCase() : "";
    return pName.includes(search) || serviceName.includes(search);
  }) || [];
  return (
    <AdminLayout>
      <div className="space-y-6" dir="rtl">

        {/* هدر و فیلد جستجو */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">مدیریت نوبت‌ها</h1>
              <p className="text-slate-500 mt-1">کنترل و نظارت بر تمام نوبت‌های ثبت شده</p>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="جستجو نام بیمار یا پزشک..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-72 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Link href="/rezerv">
                <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 transition font-medium">
                  ثبت نوبت جدید
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* کارت‌های آماری متصل به دیتابیس */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="کل نوبت‌ها" value={stats.total} color="bg-blue-600" text="white" />
          <StatCard title="تأیید شده" value={stats.confirmed} color="bg-white" text="blue-600" border />
          <StatCard title="در انتظار" value={stats.pending} color="bg-white" text="yellow-600" border />
          <StatCard title="لغو شده" value={stats.cancelled} color="bg-white" text="red-600" border />
        </div>

        {/* جدول لیست نوبت‌ها */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-800">لیست نوبت‌های ثبت شده</h2>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-500">در حال دریافت اطلاعات...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="p-20 text-center text-gray-500">هیچ نوبتی یافت نشد.</div>
            ) : (
              <table className="w-full text-right">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">بیمار</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">پزشک</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">تاریخ و ساعت</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">وضعیت</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((app) => (
                      <tr key={app._id} className="border-b hover:bg-gray-50">
                        {/*نمایش نام بیماراست */}
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {app.fullName || "نامشخص"}
                        </td>

                        {/* نمایش سرویس است */}
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {app.service || "بدون سرویس"}
                        </td>

                        {/* نمایش شماره تماس */}
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {app.phone || "بدون شماره"}
                        </td>

                        {/* نمایش وضعیت - دقت کنید نام فیلد وضعیت چیست (مثلاً status یا state) */}
                        <td className="px-6 py-4 text-sm">
                          <StatusBadge status={app.status || 'در انتظار'} />
                        </td>

                        {/* عملیات */}
                        <td className="px-6 py-4 text-sm font-medium">
                          <button
                            onClick={() => handleDelete(app._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            حذف
                          </button>
                          <button
                            onClick={() => handleConfirm(app._id)}
                            className="text-green-600 hover:text-green-900 ml-3"
                          >
                            تأیید
                          </button>

                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                        {loading ? "در حال بارگذاری..." : "هیچ نوبتی یافت نشد."}
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// کامپوننت‌های کوچک برای تمیزتر شدن کد اصلی
function StatCard({ title, value, color, text, border }) {
  return (
    <div className={`${color} ${border ? 'border border-blue-100' : ''} rounded-2xl p-5 shadow-lg flex flex-col justify-center items-center`}>
      <p className={`text-sm ${text === 'white' ? 'opacity-90' : 'text-slate-500'}`}>{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${text === 'white' ? 'text-white' : ''}`}>{value}</h2>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    'تایید شده': 'bg-green-100 text-green-700',
    'در انتظار': 'bg-yellow-100 text-yellow-700',
    'لغو شده': 'bg-red-100 text-red-700',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
}
