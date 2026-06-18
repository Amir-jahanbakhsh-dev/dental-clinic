import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout"; // فرض بر این است که این کامپوننت را داری

export default function AppointmentsManagement() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, today: 0, pending: 0 });

  // تابعی برای دریافت داده‌ها از API که خودت نوشتی
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // یا هر راهی که توکن را ذخیره می‌کنی
      const response = await fetch("/api/admin/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        setAppointments(data.appointments);
        calculateStats(data.appointments);
      }
    } catch (error) {
      console.error("خطا در دریافت نوبت‌ها:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const now = new Date();
    const todayStr = now.toLocaleDateString("en-CA"); // YYYY-MM-DD

    const total = data.length;
    const pending = data.filter((app) => app.status === "در انتظار" || app.status === "pending").length;
    const todayCount = data.filter((app) =>
      new Date(app.date).toLocaleDateString("en-CA") === todayStr
    ).length;

    setStats({ total, today: todayCount, pending });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6" dir="rtl">

        {/* بخش عنوان */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            مدیریت نوبت‌ها
          </h1>
        </div>

        {/* بخش آمارهای کلیدی */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-600 text-white rounded-2xl p-5 shadow-lg flex flex-col justify-center items-center">
            <p className="text-sm opacity-90">کل نوبت‌ها</p>
            <h2 className="text-4xl font-bold mt-2">{stats.total}</h2>
          </div>
          <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-lg flex flex-col justify-center items-center">
            <p className="text-sm text-slate-500">نوبت‌های امروز</p>
            <h2 className="text-4xl font-bold text-slate-800 mt-2">{stats.today}</h2>
          </div>
          <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-lg flex flex-col justify-center items-center">
            <p className="text-sm text-slate-500">در انتظار تایید</p>
            <h2 className="text-4xl font-bold text-orange-500 mt-2">{stats.pending}</h2>
          </div>
        </div>

        {/* جدول نمایش لیست نوبت‌ها */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-800">لیست نوبت‌های ثبت شده</h2>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-10 text-center text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p>در حال بارگذاری نوبت‌ها...</p>
              </div>
            ) : appointments.length === 0 ? (
              <p className="p-10 text-center text-gray-500">هنوز هیچ نوبتی ثبت نشده است.</p>
            ) : (
              <table className="w-full text-right">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">نام بیمار</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">تاریخ نوبت</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">ساعت</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">شماره تماس</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app) => (
                    <tr key={app._id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                        {app.fullName || "بدون نام"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(app.date).toLocaleDateString("fa-IR")}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {/* فرض بر این است که فیلد ساعت داری، اگر نداری از زمان تاریخ استخراج کن */}
                        {app.time}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {app.phone || "-"}
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
