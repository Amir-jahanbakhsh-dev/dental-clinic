import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Footer from "@/components/footer/footer";
import Header from "@/components/navbar/navbar";

const UserPanel = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch("/api/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data.user || data.data || data);
        } else {
          Swal.fire({
            icon: "error",
            title: "خطا",
            text: data.message || "دریافت اطلاعات کاربر ناموفق بود.",
          });

          localStorage.removeItem("token");
          router.push("/login");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "خطای شبکه",
          text: "ارتباط با سرور برقرار نشد.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    Swal.fire({
      icon: "success",
      title: "خروج موفق",
      text: "شما از حساب کاربری خارج شدید.",
      timer: 1200,
      showConfirmButton: false,
    }).then(() => {
      router.push("/login");
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <p className="text-gray-600">در حال دریافت اطلاعات کاربر...</p>
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
        {/* هدر پنل کاربر */}
        <header className="mt-30 max-w-4xl mx-auto flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold">سلام، {user.name} 👋</h1>
            <p className="text-gray-500 text-sm">به پنل کاربری خود خوش آمدید</p>
            {user.email && (
              <p className="text-gray-400 text-sm mt-1">{user.email}</p>
            )}
          </div>

          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition">
              + نوبت جدید
            </button>
            <button
              onClick={handleLogout}
              className="text-red-500 font-semibold py-2 px-4 hover:bg-red-50 rounded"
            >
              خروج از حساب
            </button>
          </div>
        </header>

        {/* اگر appointments از API نیامده باشد، آرایه خالی می‌گذاریم */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-lg font-bold mb-4">نوبت‌های من</h2>

          <div className="space-y-4">
            {user.appointments && user.appointments.length > 0 ? (
              user.appointments.map((app) => (
                <div
                  key={app.id}
                  className="bg-white p-6 rounded-2xl shadow-sm flex flex-wrap justify-between items-center gap-4 hover:border-blue-200 border border-transparent transition"
                >
                  <div>
                    <h3 className="font-bold text-lg">{app.service}</h3>
                    <p className="text-gray-500 text-sm">{app.doctor}</p>
                  </div>

                  <div className="flex gap-6 text-sm text-gray-600">
                    <div className="text-center">
                      <span className="block text-xs text-gray-400">تاریخ</span>
                      {app.date}
                    </div>
                    <div className="text-center">
                      <span className="block text-xs text-gray-400">ساعت</span>
                      {app.time}
                    </div>
                  </div>

                  <div
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      app.status === "تأیید شده"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </div>

                  <button className="text-gray-400 hover:text-red-500 transition">
                    لغو نوبت
                  </button>
                </div>
              ))
            ) : (
              <div className="bg-white p-6 rounded-2xl shadow-sm text-gray-500 text-center">
                هنوز نوبتی ثبت نشده است.
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
