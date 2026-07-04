import { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";
import Header from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // ذخیره توکن در لوکال استوریج برای استفاده‌های بعدی
        localStorage.setItem("token", data.token);

        Swal.fire({
          icon: "success",
          title: "خوش آمدید!",
          text: "با موفقیت وارد شدید.",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          router.push("/userPanel");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "خطا در ورود",
          text: data.message || "ایمیل یا رمز عبور اشتباه است.",
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
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-30">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-[Btitr] text-gray-800 mb-2">ورود به حساب کاربری</h1>
            <p className="text-gray-500 text-sm">برای ورود، ایمیل و رمز عبور خود را وارد کنید.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">ایمیل</label>
              <input
                required
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="ایمیل خود را وارد کنید"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">رمز عبور</label>
                <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
                  فراموشی رمز عبور؟
                </Link>
              </div>
              <input
                required
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="رمز عبور خود را وارد کنید"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className={`w-full ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white font-[Btitr] py-2 rounded-lg transition duration-300`}
            >
              {isLoading ? "در حال ورود..." : "ورود"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            حساب کاربری ندارید؟{" "}
            <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
              ثبت نام کنید
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
