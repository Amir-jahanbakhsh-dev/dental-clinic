import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        const result = await res.json();
        if (result.success) {
          setStats(result.data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // یک تابع کمکی برای نمایش حالت لودینگ یا عدد
  const renderStat = (value) => {
    if (loading) return <span className="animate-pulse bg-gray-200 h-8 w-16 inline-block rounded"></span>;
    return value;
  };

  return (
    <AdminLayout>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">داشبورد مدیریت</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* کل نوبت‌ها */}
        <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-lg">
          <p className="text-sm opacity-90">کل نوبت‌ها</p>
          <h2 className="mt-2 text-3xl font-bold">
            {renderStat(stats.total)}
          </h2>
        </div>

        {/* تأیید شده */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <p className="text-sm text-gray-500">تأیید شده</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {renderStat(stats.confirmed)}
          </h2>
        </div>

        {/* در انتظار */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <p className="text-sm text-gray-500">در انتظار</p>
          <h2 className="mt-2 text-3xl font-bold text-yellow-600">
            {renderStat(stats.pending)}
          </h2>
        </div>

        {/* لغو شده */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <p className="text-sm text-gray-500">لغو شده</p>
          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {renderStat(stats.cancelled)}
          </h2>
        </div>
      </div>
    </AdminLayout>
  );
}
