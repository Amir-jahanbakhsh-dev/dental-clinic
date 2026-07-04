
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/admin-logout', { method: 'POST' });
    } catch (error) {
      console.error('Admin logout error:', error);
    } finally {
      router.push('/admin/login');
    }
  };

  const navItems = [
    { label: 'داشبورد', href: '/admin', icon: '🏠' },
    { label: 'مدیریت نوبت‌ها', href: '/admin/appointments', icon: '📅' },
    { label: 'بیماران', href: '/admin/patients', icon: '🧍‍♀️' },
    { label: 'پزشکان', href: '/admin/doctors', icon: '👨‍⚕️' },
    { label: 'پیام‌ها', href: '/admin/messages', icon: '💬' },
    { label: 'مقالات', href: '/admin/artManeger', icon: '📚' },
    { label: 'سرویس ها', href: '/admin/servManeger', icon: '💻' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800" dir="rtl">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 h-screen w-72 bg-white border-l border-gray-200 shadow-xl transform transition-transform duration-300
        md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-full flex-col justify-between p-6">
          <div>
            <div className="mb-10 flex flex-col items-center">
              <Link href="/">
                <div className="text-4xl text-blue-600">🦷</div>
                <h2 className="mt-2 text-lg font-bold text-gray-800">کلینیک دندانپزشکی</h2>
              </Link>
              <span className="mt-2 rounded bg-blue-50 px-2 py-1 text-xs text-blue-600">
                پنل مدیریت
              </span>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = router.pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-2 transition
                      ${isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            خروج از حساب
          </button>

        </div>
      </aside>

      {/* Main */}
      <main className="min-h-screen md:mr-72">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <button
            className="rounded-lg bg-gray-100 px-3 py-2 md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </button>

          <input
            type="text"
            placeholder="جستجو در پنل مدیریت..."
            className="w-full max-w-md rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <div className="flex items-center gap-3">
            <div className="text-left">
              <h4 className="font-bold text-gray-800">دکتر سارا احمدی</h4>
              <p className="text-sm text-gray-400">مدیر کلینیک</p>
            </div>
            <img
              src="https://i.ibb.co/cYMbMbN/user1.jpg"
              alt="مدیر"
              className="h-11 w-11 rounded-full object-cover"
            />
          </div>
        </header>

        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
