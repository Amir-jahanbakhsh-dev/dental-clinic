import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Footer from "@/components/footer/footer";
import Header from "@/components/navbar/navbar";

const UserPanel = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]); // اضافه شد
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        // فراخوانی پروفایل و نوبت‌ها به صورت موازی برای سرعت بیشتر
        const [userRes, appRes] = await Promise.all([
          fetch("/api/user/profile", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/appointment/my", { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const userData = await userRes.json();
        const appData = await appRes.json();

        if (userRes.ok && appRes.ok) {
          setUser(userData.user || userData);
          setAppointments(appData.appointments || []);
        } else {
          // اگر توکن منقضی شده بود
          localStorage.removeItem("token");
          router.push("/login");
        }
      } catch (error) {
        console.error("خطا در دریافت اطلاعات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <p className="text-gray-600">در حال دریافت اطلاعات...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <Header />
      <div className="bg-gray-50 p-4 md:p-8" dir="rtl">
        <header className="mt-30 max-w-4xl mx-auto flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold">سلام، {user.name} 👋</h1>
            <p className="text-gray-500 text-sm">به پنل کاربری خود خوش آمدید</p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => router.push("/rezerv")} // هدایت به فرم نوبت
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              + نوبت جدید
            </button>
            <button onClick={handleLogout} className="text-red-500 font-semibold py-2 px-4 hover:bg-red-50 rounded">
              خروج
            </button>
          </div>
        </header>

        <section className="max-w-4xl mx-auto">
          <h2 className="text-lg font-bold mb-4">نوبت‌های من</h2>

          <div className="space-y-4">
            {appointments.length > 0 ? (
              appointments.map((app) => (
                <div key={app._id} className="bg-white p-6 rounded-2xl shadow-sm flex flex-wrap justify-between items-center gap-4 border border-transparent">
                  <div>
                    <h3 className="font-bold text-lg">{app.service}</h3>
                    <p className="text-gray-500 text-sm">{app.doctor}</p>
                  </div>

                  <div className="flex gap-6 text-sm text-gray-600">
                    <div className="text-center">
                      <span className="block text-xs text-gray-400">تاریخ</span>
                      {new Date(app.date).toLocaleDateString('fa-IR')}
                    </div>
                    <div className="text-center">
                      <span className="block text-xs text-gray-400">ساعت</span>
                      {app.time}
                    </div>
                  </div>

                  <div className={`px-4 py-1 rounded-full text-sm font-medium ${app.status === "confirmed" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                    {app.status === "confirmed" ? "تأیید شده" : "در انتظار"}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-6 rounded-2xl shadow-sm text-gray-500 text-center">
                هنوز نوبتی ثبت نکرده‌اید.
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default UserPanel;
