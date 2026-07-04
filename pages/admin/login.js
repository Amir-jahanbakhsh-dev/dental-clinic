import { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        Swal.fire({
          icon: "success",
          title: "خوش آمدید",
          text: "ورود به پنل مدیریت با موفقیت انجام شد.",
          timer: 1200,
          showConfirmButton: false,
        }).then(() => {
          const redirectTo = router.query.redirect || "/admin";
          router.push(redirectTo);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "خطا در ورود",
          text: data.message || "نام کاربری یا رمز عبور اشتباه است.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطای شبکه",
        text: "ارتباط با سرور برقرار نشد.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl text-blue-600 mb-2">🦷</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">ورود به پنل مدیریت</h1>
          <p className="text-gray-500 text-sm">
            برای ورود، نام کاربری و رمز عبور مدیریت را وارد کنید.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">نام کاربری</label>
            <input
              required
              type="text"
              autoComplete="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="نام کاربری مدیر"
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">رمز عبور</label>
            <input
              required
              type="password"
              autoComplete="current-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="رمز عبور مدیر"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className={`w-full ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold py-2 rounded-lg transition duration-300`}
          >
            {isLoading ? "در حال ورود..." : "ورود به پنل"}
          </button>
        </form>
      </div>
    </div>
  );
}
