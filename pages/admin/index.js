
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">داشبورد مدیریت</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-lg">
          <p className="text-sm opacity-90">کل نوبت‌ها</p>
          <h2 className="mt-2 text-3xl font-bold">128</h2>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <p className="text-sm text-gray-500">تأیید شده</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">96</h2>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <p className="text-sm text-gray-500">در انتظار</p>
          <h2 className="mt-2 text-3xl font-bold text-yellow-600">18</h2>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <p className="text-sm text-gray-500">لغو شده</p>
          <h2 className="mt-2 text-3xl font-bold text-red-600">14</h2>
        </div>
      </div>
    </AdminLayout>
  );
}
