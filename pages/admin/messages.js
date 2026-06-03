import AdminLayout from "@/components/admin/AdminLayout";

export default function MessagesPage() {
    const messages = [
        {
            id: 1,
            sender: "مریم حسینی",
            subject: "درخواست تغییر زمان نوبت",
            date: "1403/03/22",
            status: "خوانده شده",
        },
        {
            id: 2,
            sender: "علی احمدی",
            subject: "سؤال درباره هزینه درمان",
            date: "1403/03/21",
            status: "خوانده نشده",
        },
        {
            id: 3,
            sender: "رضا محمدی",
            subject: "لغو نوبت",
            date: "1403/03/20",
            status: "خوانده شده",
        },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6" dir="rtl">
                <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                                مدیریت پیام‌ها
                            </h1>
                            <p className="text-slate-500 mt-1">
                                مشاهده و پاسخ به پیام‌های کاربران و بیماران
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="جستجوی پیام..."
                                className="w-full md:w-72 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-600 text-white rounded-2xl p-5 shadow-sm">
                        <p className="text-sm opacity-90">کل پیام‌ها</p>
                        <h2 className="text-3xl font-bold mt-2">42</h2>
                    </div>
                    <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
                        <p className="text-sm text-slate-500">خوانده نشده</p>
                        <h2 className="text-3xl font-bold text-slate-800 mt-2">9</h2>
                    </div>
                    <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
                        <p className="text-sm text-slate-500">پاسخ داده شده</p>
                        <h2 className="text-3xl font-bold text-slate-800 mt-2">33</h2>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="text-lg font-semibold text-slate-800">صندوق پیام‌ها</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">فرستنده</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">موضوع</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">تاریخ</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">وضعیت</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((message) => (
                                    <tr key={message.id} className="border-t border-slate-100 hover:bg-slate-50">
                                        <td className="px-6 py-4 text-sm text-slate-800 font-medium">{message.sender}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{message.subject}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{message.date}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${message.status === "خوانده شده"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {message.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-200">
                                                    مشاهده
                                                </button>
                                                <button className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs text-blue-700 hover:bg-blue-100">
                                                    پاسخ
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
}
