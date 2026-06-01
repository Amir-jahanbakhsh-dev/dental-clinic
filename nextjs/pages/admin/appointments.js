
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AppointmentsPage() {
  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-gray-800">مدیریت نوبت‌ها</h1>
        <button className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
          + نوبت جدید
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white p-6 shadow-lg">
        <table className="min-w-[900px] w-full text-right">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ردیف</th>
              <th className="p-3">بیمار</th>
              <th className="p-3">خدمت</th>
              <th className="p-3">پزشک</th>
              <th className="p-3">تاریخ</th>
              <th className="p-3">ساعت</th>
              <th className="p-3">وضعیت</th>
              <th className="p-3">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((item) => (
              <tr key={item} className="border-b hover:bg-gray-50">
                <td className="p-3">{item}</td>
                <td className="p-3">بیمار {item}</td>
                <td className="p-3">ویزیت</td>
                <td className="p-3">دکتر احمدی</td>
                <td className="p-3">۱۴۰۳/۰۳/۲۵</td>
                <td className="p-3">۱۱:۰۰</td>
                <td className="p-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                    تأیید شده
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800">مشاهده</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
