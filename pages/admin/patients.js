import AdminLayout from "@/components/admin/AdminLayout";

export default function PatientsPage() {
    const patients = [
        {
            id: 1,
            name: "علی احمدی",
            nationalId: "0012345678",
            phone: "09123456789",
            lastVisit: "1403/03/21",
            status: "فعال",
        },
        {
            id: 2,
            name: "مریم حسینی",
            nationalId: "0098765432",
            phone: "09351234567",
            lastVisit: "1403/03/18",
            status: "در انتظار",
        },
        {
            id: 3,
            name: "رضا محمدی",
            nationalId: "0022456789",
            phone: "09198887766",
            lastVisit: "1403/03/10",
            status: "فعال",
        },
    ];

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
                        <h2 className="text-3xl font-bold mt-2">128</h2>
                    </div>
                    <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
                        <p className="text-sm text-slate-500">بیماران فعال</p>
                        <h2 className="text-3xl font-bold text-slate-800 mt-2">96</h2>
                    </div>
                    <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
                        <p className="text-sm text-slate-500">ویزیت این ماه</p>
                        <h2 className="text-3xl font-bold text-slate-800 mt-2">34</h2>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="text-lg font-semibold text-slate-800">لیست بیماران</h2>
                    </div>

                    <div className="overflow-x-auto">
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
                                    <tr key={patient.id} className="border-t border-slate-100 hover:bg-slate-50">
                                        <td className="px-6 py-4 text-sm text-slate-800 font-medium">{patient.name}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{patient.nationalId}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{patient.phone}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{patient.lastVisit}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-200">
                                                    مشاهده
                                                </button>
                                                <button className="rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-600 hover:bg-red-100">
                                                    حذف
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
